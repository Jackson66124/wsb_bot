from django.urls import path, include
from .views import create_stock, get_stocks, create_top_stock, get_top_stock, callback_view, CreateUserView, check_alpaca_token, get_all_top_stocks
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('stock/', get_stocks, name='get_stocks'),
    path('stock/create/', create_stock, name='create_stock'),
    path('stock/topstock/', get_top_stock, name='get_top_stock'),
    path('stock/all-topstock/', get_all_top_stocks, name='get_all_topstocks'),
    path('stock/create/topstock/', create_top_stock, name='create_top_stock'),
    path('callback/', callback_view, name='callback_view'),
    path('user/create/', CreateUserView.as_view(), name='create'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('check-alpaca-token/', check_alpaca_token, name='check-alpaca-token'),
    path('-auth/', include("rest_framework.urls")),
]