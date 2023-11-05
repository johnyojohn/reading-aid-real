# app/main.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from .pos_tagging import analyze_text
import spacy
import wikipedia
from wikipedia.exceptions import DisambiguationError, PageError
import wikipediaapi


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

nlp = spacy.load("en_core_web_md")


@app.route('/')
def hello_world():
    return "helllo weeerld"


@app.route('/part-of-speech', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    result = analyze_text(text)
    return jsonify(result)


@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get("text")
    
    # Process the text using spaCy to identify proper nouns and other entities
    doc = nlp(text)
    identified_elements = []
    
    for ent in doc.ents:
        print(f"Entity found: {ent.text} ({ent.label_})")  # Debug print
        if ent.label_ in ["PROPN", "NORP"]:
            element = {
                "text": ent.text,
                "start": ent.start_char,
                "end": ent.end_char,
                "label": ent.label_
            }
            identified_elements.append(element)
    
    # Fetch related information for each identified element from Wikipedia
    for element in identified_elements:
        try:
            summary = wikipedia.summary(element["text"], sentences=1)
            element["tooltipData"] = summary
        except DisambiguationError as e:
            print(f"DisambiguationError for {element['text']}: {e.options}")  # Debug print
            element["disambiguationOptions"] = e.options[:5]  # Limit the number of options
        except PageError:
            print(f"PageError for {element['text']}")  # Debug print
            element["tooltipData"] = "Information not found."
        except Exception as e:
            print(f"Unexpected error for {element['text']}: {str(e)}")  # Catch-all for any other exceptions
            element["tooltipData"] = "An unexpected error occurred."
    
    return jsonify(identified_elements=identified_elements)


if __name__ == '__main__':
    app.run(debug=True)