from auxiliary import num_posts_with_label, words_count, labeled_words_count, total_num_posts, unique_words, nta_unique_words, yta_unique_words, remove_punctuation
import math 

# Determine the most likely label

def classify(text_input):
    arr = text_input.split()
    bag_of_words = set()
    for word in arr:
        word = remove_punctuation(word)
        bag_of_words.add(word)

    # Running count of the total log-probability score of both categories 
    total_lp_nta, total_lp_yta = 0

    # Calculate log-prior probability of label C 
    total_lp_nta += math.log(num_posts_with_label['Not the A-hole'] * 1.0 / total_num_posts)
    total_lp_yta += math.log(num_posts_with_label['Asshole'] * 1.0 / total_num_posts)

    # Calculate log-likelihood of word 
    for word in bag_of_words:
        # If word doesn't occur anywhere at all in the training set
        if word not in unique_words:
            total_lp_nta += math.log(1.0/total_num_posts)
            total_lp_yta += math.log(1.0/total_num_posts)

        elif word not in nta_unique_words:
            total_lp_yta += math.log(words_count[word] * 1.0 / total_num_posts)
        
        elif word not in yta_unique_words:
            total_lp_nta += math.log(words_count[word] * 1.0 / total_num_posts)

        else:
            total_lp_nta += math.log(labeled_words_count[('Not the A-hole', word)] * 1.0 / num_posts_with_label['Not the A-hole'])
            total_lp_yta += math.log(labeled_words_count[('Asshole', word)] * 1.0 / num_posts_with_label['Asshole'])

    return (total_lp_nta, total_lp_yta)        




