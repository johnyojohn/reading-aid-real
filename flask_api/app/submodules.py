import spacy
import nltk
nltk.download('punkt')
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
import requests
from bs4 import BeautifulSoup
nlp = spacy.load("en_core_web_sm")
#THESE FUNCTIONS ARE NOT PROPERLY INTEGRATED INTO FLASK API

def identifyProperNouns(text):
    doc = nlp(text)
    properNouns = [token.text for token in doc if token.pos_ == "PROPN"]
    return properNouns




def checkWikipedia(word_or_phrase):
    response = requests.get(f"https://en.wikipedia.org/w/api.php", params={"action": "query", "list": "search", "srsearch": word_or_phrase, "format": "json"})
    data = response.json()
    return len(data["query"]["search"]) > 0


def processText(text):
    properNouns = identifyProperNouns(text)
    wikipediaEntries = [word for word in properNouns if checkWikipedia(word)]
    return {
        "properNouns": properNouns,  
        "wikipediaEntries": wikipediaEntries}


#Alli's Extra Work Pls tell me I was on the right path....
# Highlight the word and get definition and synonyms
def getWordMeaningandSynonyms(text, highlightedWord):
    doc = nlp(text)
    synonyms = []
    for token in doc:
        if token.text == highlightedWord:
            wordSynsets = wordnet.synsets(token.text)
            for synset in wordSynsets:
                synonyms.extend(synset.lemma_names())
    return list(set(synonyms))


def findAbbreviationExpansion(text, highlightedAbbreviation):
    doc = nlp(text)
    for token in doc:
        if token.text == highlightedAbbreviation:
            abbreviationExpansion = getAbbreviationExpansion(highlightedAbbreviation)
            if abbreviationExpansion:
                return abbreviationExpansion
    return None


def getAbbreviationExpansion(abbreviation):
    words = word_tokenize(abbreviation)
    expanded_version = []


    for word in words:
        wordSynsets = wordnet.synsets(word)
        if wordSynsets:
            expanded_version.append(wordSynsets[0].lemmas()[0].name())
        else:
            expanded_version.append(word)


    return " ".join(expanded_version)


if __name__ == "__main__":
    text = input("Enter text: ")
    highlightedWord = input("Highlight a word: ")
    abbreviationExpansion = findAbbreviationExpansion(text, highlightedWord)
    synonyms = getWordMeaningandSynonyms(text, highlightedWord)
    if synonyms:
        print(f"Synonyms of '{highlightedWord}': {','.join(synonyms)}")
    else:
        print(f"No synonyms found for '{highlightedWord}'")
    if abbreviationExpansion:
        print(f"Expanded version of '{highlightedWord}': {abbreviationExpansion}")
    else:
        print(f"No expansion found for '{highlightedWord}'")

