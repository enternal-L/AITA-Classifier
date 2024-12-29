# https://eecs280staff.github.io/ml-classifier/#training

'''
Before the classifier can make predictions, it needs to be trained on a set of previously labeled AITA posts.

Record: 

The total number of posts in the entire training set.
The number of unique words in the entire training set. (The vocabulary size.)
For each word w, the number of posts in the entire training set that contain w.
For each label C, the number of posts with that label.
For each label C and word w, the number of posts with label C that contain w.
'''

import pandas as pd 
import re 
from collections import defaultdict

# ---------------------------------------------------------
# Get the total number of posts in the entire training set.
# ---------------------------------------------------------

df = pd.read_csv("../aita-base-filtered-unskewed.csv")
total_num_posts = len(df)

# ---------------------------------------------------------------------------------
# Get the number of unique words in the entire training set. (The vocabulary size.)
# For each word w, the number of posts in the entire training set that contain w.
# ---------------------------------------------------------------------------------

# helper function :3
def remove_punctuation(text):
    # Remove all non-alphanumeric characters, keeping hyphens and letters
    text = re.sub(r'[^a-zA-Z0-9-]', '', text)
    text = text.replace('-', '')
    return text.lower()


unique_words = set() # unique_words: set of words

nta_unique_words = set()

yta_unique_words = set()

words_count = defaultdict(int)

labeled_words_count = defaultdict(int)

num_posts_with_label = defaultdict(int)


def data_init():
    for _, row in df.iterrows():

        content_arr = row['Content'].split()
        # To prevent duplicates in dictionary
        words_seen_in_current_post = set()

        for word in content_arr:       
            
            # Set 
            word = remove_punctuation(word)
            
            unique_words.add(word)

            if row['Label'] == 'Not the A-hole':
                nta_unique_words.add(word)
            
            elif row['Label'] == 'Asshole':
                yta_unique_words.add(word)

            # Dictionary
            if word not in words_seen_in_current_post:
                words_count[word] += 1
                labeled_words_count[(row['Label'], word)] += 1
                words_seen_in_current_post.add(word)

    # ------------------------------------------------------
    # For each label C, the number of posts with that label.
    # ------------------------------------------------------
    global num_posts_with_label
    num_posts_with_label = df['Label'].value_counts().to_dict()

    # for key, value in num_posts_with_label.items():
    #     print(f"{key}, {value}")

# unique_words: set of words
    # labels: set of labels
    # num_posts_with_label: dict of key (label) to value (count)
    # words_count: default dict of key (word) to value (count)
    # labeled_words_count: default dict of key((label, word)) to value (count)
    # total_num_posts: count of posts
    # vocab_size: count of unique words
