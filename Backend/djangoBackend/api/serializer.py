from rest_framework import serializers
from .models import Stock, TopStock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class TopStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopStock
        fields = '__all__'