import praw
import csv
from dotenv import load_dotenv
import os

def configure():
    load_dotenv()

configure()

reddit = praw.Reddit(
    client_id=os.getenv('client_id'),
    client_secret=os.getenv('client_secret'),
    user_agent='WSB_Bot by Jackson Kight'
)

file_path = 'Backend\model\csv_files\WSB_Bot_Data.csv'

subreddit = reddit.subreddit("wallstreetbets")

top_posts = subreddit.top(time_filter='all', limit=10000)
top_posts_year = subreddit.top(time_filter='year', limit = 10000)
top_posts_month = subreddit.top(time_filter='month', limit = 10000)

if os.path.getsize(file_path) == 0:
    with open(file_path, 'w', encoding='utf-8', newline='') as file:
        writer = csv.writer(file)

        for post in top_posts:
            writer.writerow([post.title, 0])

        for post in top_posts_year:
            #filter out posts from top posts all time
            if post.score < 33000:
                writer.writerow([post.title, 0])

        for post in top_posts_month:
            #filter out posts from top posts this year
            if post.score < 2600:
                writer.writerow([post.title, 0])

    print('Write to file succsesful')
