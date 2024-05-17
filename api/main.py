import os
import uuid

import chromadb
import requests
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
from flask_cors import CORS
from history import ConversationHistory
from logger import logger
from models import GPTResponse
from prompts import PROMPT
from pydantic import TypeAdapter
from saved_messages import SavedMessage, SavedMessages

from flask import Flask, jsonify, request
from flask.logging import default_handler

GPT_MODEL = "gpt-3.5-turbo"
GPT_API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

app = Flask(__name__)
app.logger.handlers = logger.handlers
# wip, using 2>> to redirect stderr logs to flask.log
app.logger.removeHandler(default_handler)
app.logger.setLevel(logger.level)
CORS(app)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# for docker build, use this line:
# client = chromadb.HttpClient(host="chroma", port=8000)
client = chromadb.HttpClient(host="localhost", port=8000)

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
)

collection = client.get_or_create_collection(name="test_collection", embedding_function=openai_ef)

conversation = ConversationHistory()
saved_messages = SavedMessages()
message_id = 0
app.logger.info("Server ready")


def stringify_headers(headers):
    header_string = ""
    for key, value in headers.items():
        header_string += f"{key}: {value}; "
    return header_string.rstrip("; ")


def validate_request(bubble_id: str):
    headers = stringify_headers(request.headers)
    logger.debug(f"{bubble_id} | HTTP request headers: {headers}")
    method = request.method
    logger.debug(f"{bubble_id} | HTTP request method: {method}")
    url = request.url
    logger.debug(f"{bubble_id} | HTTP request url: {url}")


@app.route("/api/title")
def title():
    return jsonify(title="helpme.ai")


@app.route("/api/savedmessages")
def savedmessages():
    return jsonify(saved_messages.get_messages_text())


@app.route("/api/save-message", methods=["POST"])
def add_savedmessage():
    global message_id

    try:
        data = request.json
        for saved_message in saved_messages.get_messages():
            if saved_message.text == data["message"]:
                return jsonify({"error": "Message already saved"}), 400
        saved_messages.add_message(SavedMessage(id=message_id, text=data["message"]))
        message_id += 1
        return jsonify({"status": "Message saved"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/process-request", methods=["POST"])
def process_request():
    bubble_id = (uuid.uuid4().hex)[:6]
    logger.info(f"Processing request {bubble_id}")
    validate_request(bubble_id)
    question = request.json.get("request")
    logger.debug(f"{bubble_id} | Received question from frontend: {question}")

    query = collection.query(query_texts=[question], n_results=2, include=["documents"])
    context = query["documents"]
    logger.debug(f"{bubble_id} | Context: {context}")

    prompt = PROMPT.format(context=context, question=question)
    logger.debug(f"{bubble_id} | Prompt: {prompt}")
    messages = []
    if conversation.get_history() == []:
        pass
    else:
        messages = conversation.to_dict()
    logger.debug(f"{bubble_id} | Conversation history: {messages}")
    messages.append({"role": "user", "content": prompt})
    conversation.add_entry("user", question)

    data = {"model": GPT_MODEL, "messages": messages, "temperature": 0.7}

    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"}

    logger.debug(f"{bubble_id} | Request made to OpenAI: {data}")
    gpt_response = (requests.post(GPT_API_ENDPOINT, headers=headers, json=data)).json()
    logger.debug(f"{bubble_id} | Response from OpenAI: {gpt_response}")

    model = TypeAdapter(GPTResponse).validate_python(gpt_response)
    answer = model.choices[0].message.content
    conversation.add_entry("assistant", answer)

    logger.debug(f"{bubble_id} | Answer sent to frontend: {answer}")
    logger.info(f"{bubble_id} | Prompt tokens used: {model.usage.prompt_tokens}")
    logger.info(f"{bubble_id} | Completion tokens used: {model.usage.completion_tokens}")
    logger.info(f"{bubble_id} | Total tokens used: {model.usage.total_tokens}")

    logger.info(f"Generated bubble {bubble_id}")
    return jsonify({"status": f"Generated bubble {bubble_id}", "answer": answer})


if __name__ == "__main__":
    # for docker build, use this line:
    # app.run(debug=True, host='0.0.0.0', port=5000)
    app.run(debug=True, host="127.0.0.1")
