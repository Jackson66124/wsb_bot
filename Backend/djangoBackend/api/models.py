from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=10)
    date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('symbol', 'date')

    def __str__(self):
        return f'{self.symbol} on {self.date}'
    
class TopStock(models.Model):
    symbol = models.CharField(max_length=10)
    date = models.DateField(auto_now_add=True, unique=True)

    def __str__(self):
        return f'Top Stock: {self.symbol} on {self.date}'
    
class UserToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='alpaca_token')
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Alpaca Token"