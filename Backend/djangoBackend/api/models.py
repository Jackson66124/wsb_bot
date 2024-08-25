from django.db import models

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