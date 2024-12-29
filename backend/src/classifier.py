import math 
import re
import numpy as np
import pandas as pd 
from decimal import Decimal, getcontext
from collections import defaultdict
# Determine the most likely label

class Classifier():
    def __init__(self):
        self.unique_words = set()

        self.nta_unique_words = set()

        self.yta_unique_words = set()

        self.words_count = defaultdict(int)

        self.labeled_words_count = defaultdict(int)

        self.num_posts_with_label = defaultdict(int)

        self.total_num_posts = 0

    def data_init(self):
        # ---------------------------------------------------------
        # Get the total number of posts in the entire training set.
        # ---------------------------------------------------------

        df = pd.read_csv("aita-base-filtered-unskewed.csv")
        
        self.total_num_posts = len(df)

        for _, row in df.iterrows():

            content_arr = row['Content'].split()
            # To prevent duplicates in dictionary
            words_seen_in_current_post = set()

            for word in content_arr:       
                
                # Set 
                word = self.remove_punctuation(word)
                
                self.unique_words.add(word)

                if row['Label'] == 'Not the A-hole':
                    self.nta_unique_words.add(word)
                
                elif row['Label'] == 'Asshole':
                    self.yta_unique_words.add(word)

                # Dictionary
                if word not in words_seen_in_current_post:
                    self.words_count[word] += 1
                    self.labeled_words_count[(row['Label'], word)] += 1
                    words_seen_in_current_post.add(word)

        # ------------------------------------------------------
        # For each label C, the number of posts with that label.
        # ------------------------------------------------------
        self.num_posts_with_label = df['Label'].value_counts().to_dict()
    
    def remove_punctuation(self, text):
        # Remove all non-alphanumeric characters, keeping hyphens and letters
        text = re.sub(r'[^a-zA-Z0-9-]', '', text)
        text = text.replace('-', '')
        return text.lower() 
    
    def classify(self, text_input):
        arr = text_input.split()
        bag_of_words = set()
        for word in arr:
            word = self.remove_punctuation(word)
            bag_of_words.add(word)

        # Running count of the total log-probability score of both categories 
        total_lp_nta = 0
        total_lp_yta = 0

        # Calculate log-prior probability of label C 
        total_lp_nta += math.log(self.num_posts_with_label['Not the A-hole'] * 1.0 / self.total_num_posts)
        total_lp_yta += math.log(self.num_posts_with_label['Asshole'] * 1.0 / self.total_num_posts)

        # Calculate log-likelihood of word 
        for word in bag_of_words:
            # If word doesn't occur anywhere at all in the training set
            if word not in self.unique_words:
                print(f"A {math.log(1.0/self.total_num_posts)}")

                total_lp_nta += math.log(1.0/self.total_num_posts)
                total_lp_yta += math.log(1.0/self.total_num_posts)

            elif word not in self.nta_unique_words:
                print(f"B {math.log(self.words_count[word] * 1.0 / self.total_num_posts)}")

                total_lp_nta += math.log(self.words_count[word] * 1.0 / self.total_num_posts)
            
            elif word not in self.yta_unique_words:
                print(f"C {math.log(self.words_count[word] * 1.0 / self.total_num_posts)}")

                total_lp_yta += math.log(self.words_count[word] * 1.0 / self.total_num_posts)

            else:
                print(f"D {math.log(self.labeled_words_count[('Not the A-hole', word)] * 1.0 / self.num_posts_with_label['Not the A-hole'])} | {math.log(self.labeled_words_count[('Asshole', word)] * 1.0 / self.num_posts_with_label['Asshole'])}")

                total_lp_nta += math.log(self.labeled_words_count[('Not the A-hole', word)] * 1.0 / self.num_posts_with_label['Not the A-hole'])
                total_lp_yta += math.log(self.labeled_words_count[('Asshole', word)] * 1.0 / self.num_posts_with_label['Asshole'])

        getcontext().prec = 50

        nta_prob = Decimal(total_lp_nta).exp()
        yta_prob = Decimal(total_lp_yta).exp()

        sum_probs = nta_prob + yta_prob
        nta_prob /= sum_probs
        yta_prob /= sum_probs

        return (nta_prob, yta_prob)     
    

# for debugging
# print("unique words", len(self.unique_words))
# print("nta unique words", len(self.nta_unique_words))
# print("yta unique words", len(self.yta_unique_words))
# print("words count", len(self.words_count))
# print("num posts with label", len(self.num_posts_with_label))
# print("total number of posts", self.total_num_posts)




