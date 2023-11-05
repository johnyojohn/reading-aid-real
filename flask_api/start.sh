#!/bin/bash

export FLASK_APP=app/main.py
export FLASK_ENV=development
pipenv run flask --debug run --port 5000 --host 0.0.0.0
