from rest_framework import serializers
from .models import Stock, TopStock
from django.contrib.auth.models import User

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class TopStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopStock
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user