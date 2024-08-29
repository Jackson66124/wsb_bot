import praw
import pandas as pd
import tensorflow as tf
import pandas as pd
import re, sys, io, os, csv
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
    for title in stocks:
        cleaned_string = re.sub(r'[^a-zA-Z ]', '', title)
        stock_finder = cleaned_string.split()
        for tick in tickers:
            for stock in stock_finder:
                if stock == tick:
                    top_tickers.append(stock)

get_trending_stocks(trending_stocks)

top_stock = check_for_stock(top_pos_posts)

def write_stocks_to_csv(top_tickers, top_stock):
    with open('Backend\model\csv_files\Top_stocks.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Top Tickers", "Top Stock"])

        writer.writerow([top_tickers[0], top_stock])
        tickers_used = []
        tickers_used.append(top_tickers[0])

        for ticker in top_tickers[1:]:
            if ticker not in tickers_used:
                writer.writerow([ticker, ''])
                tickers_used.append(ticker)

write_stocks_to_csv(top_tickers, top_stock)
