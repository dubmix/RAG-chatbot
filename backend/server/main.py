import logging
import requests

from flask import Flask
from flask_cors import CORS
from bs4 import BeautifulSoup
from logger import logger

app = Flask(__name__)
CORS(app)

@app.route('/')
def test():
    message = "MASP"
    return 'MASP'

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1')