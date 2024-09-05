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

model_path = os.path.join('Backend', 'model', 'WSB_Sentiment_Model')
csv_path = os.path.join('Backend', 'model', 'csv_files', 'stock_tickers.csv')

model = load_model(model_path)
tickers = pd.read_csv(csv_path)['Symbol'].tolist()

reddit = praw.Reddit(
    client_id=os.getenv("CLIENT_ID"),
    client_secret=os.getenv("CLIENT_SECRET"),
    user_agent='WSB_Bot by Jackson Kight'
)

daily_posts = []
top_tickers = []
trending_stocks = []
neg_stocks = []
top_stock = []

def fetch_daily_posts(subreddit_name="wallstreetbets", limit=500):
    subreddit = reddit.subreddit(subreddit_name)
    posts = subreddit.top(time_filter='day', limit=limit)
    return [post.title for post in posts]

def predict_sentiment(posts):
    dataset = tf.data.Dataset.from_tensor_slices(posts).batch(32)
    predictions = model.predict(dataset)
    return tf.argmax(predictions, axis=-1).numpy()

def categorize_posts(posts, labels):
    positive_posts = [posts[i] for i, label in enumerate(labels) if label == 1]
    negative_posts = [posts[i] for i, label in enumerate(labels) if label == 2]
    return positive_posts, negative_posts


def extract_stocks_from_titles(posts, tickers):
    extracted_stocks = []
    for title in posts:
        words = splitPosts(title)
        for word in words:
            if word in tickers and word not in extracted_stocks:
                extracted_stocks.append(word)
    return extracted_stocks

def splitPosts(title):
    return re.sub(r'\$', '', title).split()

def post_stock_to_backend(stock, endpoint):
    url = f'https://wsbbot-production.up.railway.app/stock/create/{endpoint}'
    headers = {'X-Internal-Token': os.getenv('INTERNAL_API_TOKEN')}
    
    try:
        response = requests.post(url, json={'symbol': stock}, headers=headers)
        response.raise_for_status()
        if endpoint == 'topstock/':
            print(f'Successfully created top stock: {stock}')
        else:
            print(f'Successfully created stock: {stock}')
        return response.json()
    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        print(f"Response content: {response.content}")
    except Exception as err:
        print(f"An error occurred: {err}")
    return None

def main():
    global daily_posts, top_tickers, trending_stocks, neg_stocks, top_stock

    daily_posts = fetch_daily_posts()
    trending_stocks = daily_posts

    labels = predict_sentiment(daily_posts)
    top_pos_posts, top_neg_posts = categorize_posts(daily_posts, labels)

    neg_stocks = extract_stocks_from_titles(top_neg_posts, tickers)

    top_stock = extract_stocks_from_titles(top_pos_posts, tickers)
    top_tickers = extract_stocks_from_titles(trending_stocks, tickers)

    if top_stock:
        post_stock_to_backend(top_stock[0], 'topstock/')

    count = 0;    
    
    for ticker in top_tickers:
        if count < 10:
            post_stock_to_backend(ticker, '')
            count += 1

main()