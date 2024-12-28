import praw
from dotenv import load_dotenv
import os
import time
import csv   
import requests
import datetime
load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("CLIENT_ID"),
    client_secret=os.getenv("CLIENT_SECRET"),
    user_agent="AITA-Classifier (by u/mmm_oist and u/enternalGT)"
)

print(reddit.read_only)

count = 0



count = 0
submission = reddit.subreddit("AskReddit").random()
print(submission.title)

# for submission in reddit.subreddit("AmItheAsshole").controversial(time_filter = "year", limit=20000):
#     print(count)
#     count += 1
#     time.sleep(0.01)

#     if (submission.link_flair_text == "None" or submission.link_flair_text == "UPDATE"):
#         print("skipping")
#         continue

#     fields=[submission.link_flair_text,submission.title,submission.selftext]

    # with open(r'aita-base copy.csv', 'a') as f:
    #     writer = csv.writer(f)
    #     writer.writerow(fields)
    


# fields=['first','second','third']
# with open(r'test.csv', 'a') as f:
#     writer = csv.writer(f)
#     writer.writerow(fields)