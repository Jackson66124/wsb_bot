from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Stock, TopStock
from .serializer import StockSerializer, TopStockSerializer

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