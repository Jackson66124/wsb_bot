from alpaca.trading.client import TradingClient
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce
import os
from dotenv import load_dotenv
import webbrowser
from daily_post import top_tickers, top_pos_posts, check_for_stock
import requests

load_dotenv()

client_id = '417db213be83cf52f1eea3401059d617'
redirect_uri = "http://localhost:8000/callback/"
auth_url = f"https://app.alpaca.markets/oauth/authorize?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=trading"

webbrowser.open(auth_url)

token = 'token'
real_url = "https://api.alpaca.markets/v2/orders"

def place_order(stock):
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

top_stock = check_for_stock(top_pos_posts)
place_order(top_stock)