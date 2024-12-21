import praw
from dotenv import load_dotenv
import os

load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("CLIENT_ID"),
    client_secret=os.getenv("CLIENT_SECRET"),
    user_agent="AITA-Classifier (by u/mmm_oist and u/enternalGT)"
)

print(reddit.read_only)

for submission in reddit.subreddit("AmItheAsshole").top(time_filter = "year", limit=100):
    if (submission.link_flair_text == "None" or submission.link_flair_text == "UPDATE"):
        continue
    print(submission.link_flair_text)