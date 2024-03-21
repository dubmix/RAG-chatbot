import logging
import requests

from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from logger import logger

app = Flask(__name__)
CORS(app)

@app.route('/')
def title():
    message = "MASP"
    return message

@app.route('/send-message', methods=['POST'])
def send_message():
    message = request.json.get('message')
    print('Received message:', message)
    modified_message = message + ' (this is a response from the backend!)'
    return jsonify({'status': 'Message received!', 'modified_message': modified_message})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1')