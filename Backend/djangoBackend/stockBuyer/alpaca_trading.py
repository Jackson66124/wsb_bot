from dotenv import load_dotenv
from daily_post import top_pos_posts, check_for_stock, top_tickers
import requests
from django import apps
import os
import sys
import django

load_dotenv()

project_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoBackend.settings")
django.setup()
from api.models import UserToken

def place_paper_order(stock, token):
    url = "https://paper-api.alpaca.markets/v2/orders"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    data = {
        'symbol': stock,
        'qty': 1,
        'side': 'buy',
        'type': 'market',
        'time_in_force': 'day'
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        print("Order placed successfully.")
        return response.json()
    else:
        print(f"Failed to place order. Response: {response.text}")
        return None
    
def place_real_order(stock, token):
    url = "https://api.alpaca.markets/v2/orders"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    data = {
        'symbol': stock,
        'qty': 1,
        'side': 'buy',
        'type': 'market',
        'time_in_force': 'day'
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        print("Order placed successfully.")
        return response.json()
    else:
        print(f"Failed to place order. Response: {response.text}")
        return None
    
#Place paper order for every connected user
top_stock = check_for_stock(top_pos_posts)
user_tokens = UserToken.objects.all()
for user_token in user_tokens:
    place_paper_order(top_stock, user_token.token)
