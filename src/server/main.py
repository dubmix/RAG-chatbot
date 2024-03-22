import logging
import requests
import time
import langchain
import chromadb

from flask import Flask, request, jsonify
from flask_cors import CORS
import bs4
from logger import logger
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

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
    modified_message = 'backend says: ' + message + ' bro'
    time.sleep(2)
    return jsonify({'status': 'Message received!', 'modified_message': modified_message})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1')