from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import  AllowAny
from rest_framework import status, generics
from rest_framework.views import APIView
from .models import Stock, TopStock, UserToken
from .serializer import StockSerializer, TopStockSerializer, UserSerializer
from dotenv import load_dotenv
import os, jwt
import requests
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import get_object_or_404
import pandas as pd
from .custom_auth import InternalAPIAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from .custom_permissions import IsAuthenticatedOrInternal
from datetime import datetime


load_dotenv()

User = get_user_model()

# Create your views here.
@api_view(['GET'])
@authentication_classes([InternalAPIAuthentication])
@permission_classes([IsAuthenticatedOrInternal])
def get_stocks(request):
    date_str = request.GET.get('date', None)
    if date_str:
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            symbols = Stock.objects.filter(date=date_obj)
        except ValueError:
            return Response({'Error'}, status=400)
    else : 
        symbols = Stock.objects.all()
    serializer = StockSerializer(symbols, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([InternalAPIAuthentication])
@permission_classes([IsAuthenticatedOrInternal])
def create_stock(request):
    serializer = StockSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([InternalAPIAuthentication])
@permission_classes([IsAuthenticatedOrInternal])
def create_top_stock(request):
    serializer = TopStockSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([InternalAPIAuthentication])
@permission_classes([IsAuthenticatedOrInternal])
def get_top_stock(request):
    date_str = request.GET.get('date', None)
    if date_str:
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            symbol = TopStock.objects.filter(date=date_obj)
        except:
            return Response({'Error'}, status=400)
    else:        
        today = datetime.now().date()
        symbol = TopStock.objects.filter(date=today)
    serializer = TopStockSerializer(symbol, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([InternalAPIAuthentication])
@permission_classes([IsAuthenticatedOrInternal])
def get_all_top_stocks(request):
    symbols = TopStock.objects
    serializer = TopStockSerializer(symbols, many=True)
    return Response(serializer.data)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([AllowAny])
def check_alpaca_token(request):
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]

    payload = decode_jwt(token)
    user_id = payload['user_id']

    user = get_object_or_404(User, id=user_id)

    if hasattr(user, 'alpaca_token') and user.alpaca_token:
            return Response({'has_alpaca_token': True}, status=status.HTTP_200_OK)
    else:
        return Response({'has_alpaca_token': False}, status=status.HTTP_200_OK)
    

def callback_view(request):
    auth_code = request.GET.get('code')
    jwt_token = request.GET.get('state')

    if not auth_code:
        return HttpResponse("No authorization code found", status=400)
    
    if not jwt_token:
        return HttpResponse("No JWT token found", status=400)
    
    url = 'https://api.alpaca.markets/oauth/token'
    data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'client_id': '417db213be83cf52f1eea3401059d617',
        'client_secret': os.getenv('alpaca_client_secret'),
        'redirect_uri': 'https://wsbbot-production.up.railway.app/callback/',
    }
    response = requests.post(url, data=data)

    try:
        decoded_jwt = decode_jwt(jwt_token)
        user_id = decoded_jwt['user_id']
    except Exception as e:
        return Response({'error': 'JWT token could not be decoded'})

    if response.status_code == 200:
        alpaca_access_token = response.json().get('access_token')

        try:
            user = get_object_or_404(User, id=user_id)
            user_token, created = UserToken.objects.get_or_create(user=user)

            user_token.token = alpaca_access_token
            user_token.save()
        except Exception as e:
            return JsonResponse({'error': f'Error Updating Token: {str(e)}'}, status=500)

        redirect_url = 'https://wsb-bot.vercel.app/connected/'
        return HttpResponseRedirect(redirect_url)
    else:
        error_message = f'Failed to obtain access token. Response: {response.text}'
        return HttpResponse(error_message, status=response.status_code)
    
def decode_jwt(token):
    try:
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None