import praw
import pandas as pd
import tensorflow as tf
import pandas as pd
import re, sys, io, os, requests
from dotenv import load_dotenv
from tf_keras.models import load_model

load_dotenv()

#allow console utf-8 encoding for emojis for testing
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

model = load_model('Backend\model\WSB_Sentiment_Model')
df = pd.read_csv('Backend\model\csv_files\stock_tickers.csv')
tickers = df['Symbol'].tolist()

reddit = praw.Reddit(
    client_id=os.getenv("client_id"),
    client_secret=os.getenv("client_secret"),
    user_agent='WSB_Bot by Jackson Kight'
)

daily_posts = []
top_tickers = []
trending_stocks = []

def get_top_posts():
    subreddit = reddit.subreddit("wallstreetbets")
    get_posts = subreddit.top(time_filter='day', limit=500)
    for post in get_posts:
        daily_posts.append(post.title)
        trending_stocks.append(post.title)

get_top_posts()

title_dataset = tf.data.Dataset.from_tensor_slices(daily_posts)
title_dataset = title_dataset.batch(32)
predictions = model.predict(title_dataset)
predicted_labels = tf.argmax(predictions, axis=-1).numpy()

data = [{"title": title, "label": label} for title, label in zip(daily_posts, predicted_labels)]
top_pos_posts = []

for post in data:
    if post["label"] == 1:
        top_pos_posts.append(post["title"])

def check_for_stock(posts):
    for title in posts:
        cleaned_string = re.sub(r'[^a-zA-Z ]', '', title)
        stock_finder = cleaned_string.split()
        for tick in tickers:
            for stock in stock_finder:
                if stock == tick:
                    return tick

def get_trending_stocks(stocks):
    checked_stock = []
    for title in stocks:
        cleaned_string = re.sub(r'[^a-zA-Z ]', '', title)
        stock_finder = cleaned_string.split()
        for tick in tickers:
            for stock in stock_finder:
                if stock == tick:
                    if len(top_tickers) < 10:
                        if stock not in checked_stock:
                            top_tickers.append(stock)
                            checked_stock.append(stock)

get_trending_stocks(trending_stocks)

top_stock = check_for_stock(top_pos_posts)


def create_top_stock_http(top_stock):
    headers = {'X-Internal-Token': os.getenv('INTERNAL_API_TOKEN')}
    url = 'http://localhost:8000/stock/create/topstock/'
    
    try:
        response = requests.post(url, 
                                 json={'symbol': top_stock},
                                 headers=headers,
                                 timeout=10)
        response.raise_for_status()
        print(f'Successfully created top stock: {top_stock}')
        return response.json()
    
    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Response content: {response.content}")
    except Exception as err:
        print(f"An error occurred: {err}")
    
    return None

def create_stock_http(stock):
    headers = {'X-Internal-Token': os.getenv('INTERNAL_API_TOKEN')}
    url = 'http://localhost:8000/stock/create/'
    
    try:
        response = requests.post(url, 
                                 json={'symbol': stock},
                                 headers=headers,
                                 timeout=10)
        response.raise_for_status()
        print(f'Successfully created stock: {stock}')
        return response.json()
    
    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Response content: {response.content}")
    except Exception as err:
        print(f"An error occurred: {err}")
    
    return None

top_stock_of_day = create_top_stock_http(top_stock)
for ticker in top_tickers:
    create_stock_http(ticker)