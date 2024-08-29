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
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import get_object_or_404
import pandas as pd


load_dotenv()

User = get_user_model()

# Create your views here.
@api_view(['GET'])
def get_stocks(request):
    symbols = Stock.objects.all()
    serializer = StockSerializer(symbols, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_stock(request):
    serializer = StockSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_top_stock(request):
    serializer = TopStockSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_top_stock(request):
    symbols = TopStock.objects.all()
    serializer = TopStockSerializer(symbols, many=True)
    return Response(serializer.data)

def callback_view(request):
    auth_code = request.GET.get('code')
    jwt_token = request.COOKIES.get('temp_jwt')

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
        'redirect_uri': 'http://localhost:8000/callback/',
    }
    response = requests.post(url, data=data)

    try:
        decoded_jwt = decode_jwt(jwt_token)
        user_id = decoded_jwt['user_id']
    except Exception as e:
        return Response({'error': 'JWT token could not be decoded'})

    if response.status_code == 200:
        alpaca_access_token = response.json().get('access_token')
        token_type = response.json().get('token_type')
        scope = response.json().get('scope')

        try:
            user = get_object_or_404(User, id=user_id)
            user_token = UserToken.objects.get_or_create(user=user)

            user_token.token = alpaca_access_token
            user_token.save()
        except:
            return JsonResponse(f'Error Updating Token')


        return JsonResponse(f'{token_type}, {alpaca_access_token}, {scope}, {decoded_jwt}', safe=False)
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

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class TopStocksView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        file_path = os.path.join('..', '..', 'Backend', 'model', 'csv_files', 'Top_stocks.csv')
        df = pd.read_csv(file_path)

        top_tickers = df["Top Tickers"].dropna().tolist()
        top_stock = df["Top Stock"].dropna().tolist() 
                    
        return Response({"top_tickers": top_tickers, "top_stock": top_stock})

