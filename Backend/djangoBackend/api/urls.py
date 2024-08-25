from django.urls import path
from .views import create_stock, get_stocks, create_top_stock, get_top_stock


urlpatterns = [
    path('stock', get_stocks, name='get_stocks'),
    path('stock/create', create_stock, name='create_stock'),
    path('stock/topstock', get_top_stock, name='get_top_stock'),
    path('stock/create/topstock', create_top_stock, name='create_top_stock'),
]