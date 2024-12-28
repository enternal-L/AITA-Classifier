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

df = pd.read_csv("../aita-base-filtered.csv")
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
    return text

unique_words = set()

words_count = defaultdict(int)

labeled_words_count = defaultdict(int)

count = 0
for index, row in df.iterrows():
    # print(count)
    count += 1
    content_arr = row['Content'].split()
    # To prevent duplicates in dictionary
    words_seen_in_current_post = set()

    for word in content_arr:       
        
        # Set 
        word = remove_punctuation(word)
        word = word.lower()
        unique_words.add(word)

        # Dictionary
        if word not in words_seen_in_current_post:
            words_count[word] += 1
            labeled_words_count[(row['Label'], word)] += 1
            words_seen_in_current_post.add(word)
            
            

vocab_size = len(unique_words)

# for key, value in words_count.items():
#     if value > 49:
#         print(f"{key}, {value}")

# ------------------------------------------------------
# For each label C, the number of posts with that label.
# ------------------------------------------------------

labels = df['Label'].unique()

num_posts_with_label = df['Label'].value_counts().to_dict()

for key, value in num_posts_with_label.items():
    print(f"{key}, {value}")




