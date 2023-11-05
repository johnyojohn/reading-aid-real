import nltk
from nltk.tokenize import word_tokenize

# Download the necessary NLTK models (if not already done)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

def analyze_text(text):
    nltk.data.path.append("./nltk_data/")  # Set the path to NLTK data
    tokens = word_tokenize(text)
    pos_tags = nltk.pos_tag(tokens)
    
    return {
        'analysis': [{'word': word, 'part_of_speech': pos} for word, pos in pos_tags]
    }