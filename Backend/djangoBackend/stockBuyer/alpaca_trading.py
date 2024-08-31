from dotenv import load_dotenv
from daily_post import neg_stocks
import requests
import os
import sys
import django
import alpaca_trade_api as tradeapi

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
    
def sell_neg_stocks(neg_stocks, token):
    print('nothing')
    
def get_all_top_stocks():
    token = os.getenv("INTERNAL_API_TOKEN")
    headers = {
        'X-Internal-Token': token,
        'Content-Type': 'application/json'
    }
    response = requests.get('http://127.0.0.1:8000/stock/all-topstock/', headers = headers)
    if response.status_code == 200:
        data = response.json()
        extracted_symbols = [stock['symbol'] for stock in data]

        return extracted_symbols
    else:
        raise Exception(f"Failed to fetch positions: {response.status_code} {response.text}")
    
def compare_to_neg_stocks(top_stocks, neg_stocks):
    stocks_to_sell = []
    for stock in top_stocks:
        for stock2 in neg_stocks:
            if stock == stock2:
                stocks_to_sell.append(stock)
    return stocks_to_sell
    
#Place paper order for every connected user
all_top_stocks = get_all_top_stocks()
sell = compare_to_neg_stocks(all_top_stocks, neg_stocks)


user_tokens = UserToken.objects.all()
# for user_token in user_tokens:
#     # place_paper_order(top_stock_of_day, user_token.token)
#     sell_neg_stocks(neg_stocks, user_token.token)
