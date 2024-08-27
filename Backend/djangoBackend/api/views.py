from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, generics
from .models import Stock, TopStock
from .serializer import StockSerializer, TopStockSerializer, UserSerializer
from dotenv import load_dotenv
import os
import requests
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User

load_dotenv()

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
    if not auth_code:
        return HttpResponse("No authorization code found", status=400)
    url = 'https://api.alpaca.markets/oauth/token'
    data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'client_id': '417db213be83cf52f1eea3401059d617',
        'client_secret': os.getenv('alpaca_client_secret'),
        'redirect_uri': 'http://localhost:8000/callback/',
    }
    response = requests.post(url, data=data)

    if response.status_code == 200:
        access_token = response.json().get('access_token')
        token_type = response.json().get('token_type')
        scope = response.json().get('scope')
        return JsonResponse(f'{token_type}, {access_token}, {scope}', safe=False)
    else:
        error_message = f'Failed to obtain access token. Response: {response.text}'
        return HttpResponse(error_message, status=response.status_code)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]