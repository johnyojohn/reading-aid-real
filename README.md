This is a project with a Nextjs app for frontend and rendering, and a Flask python API that handles some backend services related to text analysis. You must run both servers.


## Getting Started

All commands should be run on bash.

First, cd to the Flask directory, then run "pip install pipenv", then run "pipenv shell" and "pipenv install" to run a pipenv shell in a virtual environment and install python dependencies. Then, run "pipenv run python -m spacy download en_core_web_md".
Then, run "./start.sh" to start the development server for the Flask API at port 5000.


Then, cd to the nextjs-app directory, and run "npm install" to install npm dependencies. Run "npm run dev" to start the development server for the Nextjs App at port 3000.

This app is, in short, a readability and reading comprehension helper that takes in plaintext as input. The target audience is really anyone who is strugglign with hard reading, espeically reading filled with technical jargon or complicated wording, or if english is not your first language. It is also intended to people with learning disabilities like ADHD(like me) or dyslexia. Personally, I got the idea for it while I was reading a stupidly dense passage in a pirated philosophy book online, and thought I would really appreciate actually knowing what it was saying, and also, preferrably with a non-serif font. 

 There are two modes, an editing mode and a reading mode. In editing mode, the user can make many different typogrophy changes to the submitted text, and in reading mode, the text becomes immutable, but with the edits applied, and the user can also access a sidebar that shows a list of identified "elements of interest" in the text. For the scope of this prototype, we have decided to limit "elements of interest" to proper nouns, national/religious/political entities, and abreviations. Clicking on an identified element in the sidebar reveals more information about that thing. For proper nouns and notable national/religious/political entities, this would involve a summary of its wikipedia page using wikipedia api. For abreviations, this is, naturally, the expanded abbreviation. 

Due to severe time constraints, we were not able to fully complete and integrate our flask api into the nextjs app, although we have succesfully created many functions that do what we want them to do. We have only managed to create 3 API endpoints, two of them being test endpoints, and the third being somewhat dysfunctional. Again, this is less about how succesful the python code to execute our features were, and more about how we simply didn't have enough time to turn them into api endpoints to test. Also, only one of us knows flask and I'm about to faint from pulling an allnighter so.....dsfasdfkasmdf;askdfn;asiopdnaes'pgmosdg[a


The nextjs app uses dummy data for now. But like, its basically close to being complete. woohooooosaodmA:SkdmA:sdkmdasdm

penguin



