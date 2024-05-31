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
from datetime import datetime

from flask import Flask, jsonify, request
from flask.logging import default_handler
from pydantic import BaseModel

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

GPT_MODEL = "gpt-3.5-turbo"
GPT_API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/api/title")
    def title():
        return JSONResponse(content={"title": "hilfy"})
    
    return app

#app.logger.handlers = logger.handlers
# wip, using 2>> to redirect stderr logs to flask.log
#app.logger.removeHandler(default_handler)
#app.logger.setLevel(logger.level)
#CORS(app)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY") #type: ignore

# for docker build, use this line:
# client = chromadb.HttpClient(host="chroma", port=8000)
client = chromadb.HttpClient(host="localhost", port=8000)

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
)

collection = client.get_or_create_collection(name="asylumineurope", embedding_function=openai_ef)

conversation = ConversationHistory()
saved_msgs = SavedMessages()
message_id = 0
#app.logger.info("Server ready")


def _stringify_headers(headers):
    header_string = ""
    for key, value in headers.items():
        header_string += f"{key}: {value}; "
    return header_string.rstrip("; ")


def _validate_request(bubble_id: str):
    headers = _stringify_headers(request.headers)
    logger.debug(f"{bubble_id} | HTTP request headers: {headers}")
    method = request.method
    logger.debug(f"{bubble_id} | HTTP request method: {method}")
    url = request.url
    logger.debug(f"{bubble_id} | HTTP request url: {url}")


def _generate_llm_log(bubble_id: str, context: list | None, model: GPTResponse, data: dict, gpt_response: dict):
    logger.info(f"{bubble_id} | Context: {context}")
    logger.info(f"{bubble_id} | Request made to OpenAI: {data}")
    logger.info(f"{bubble_id} | Response from OpenAI: {gpt_response}")
    logger.info(f"{bubble_id} | Prompt tokens used: {model.usage.prompt_tokens}")
    logger.info(f"{bubble_id} | Completion tokens used: {model.usage.completion_tokens}")
    logger.info(f"{bubble_id} | Total tokens used: {model.usage.total_tokens}")
    logger.info(f"Generated bubble {bubble_id}")


# @app.get("/api/title")
# def title():
#     return JSONResponse(content={"title": "hilfy"})


# @app.get("/api/saved_messages")
# def saved_messages():
#     return saved_msgs.get_all_messages()


# @app.post("/api/save_message", status_code=201)
# def add_savedmessage(request: Request):
#     global message_id

#     try:
#         data = request.json()
#         for saved_message in saved_msgs.get_messages():
#             if saved_message.text == data["message"]: #type: ignore
#                 raise HTTPException(status_code=400, detail="Message already saved")
#         saved_msgs.add_message(SavedMessage(id=message_id, 
#                                             text=data["message"], #type: ignore
#                                             date=datetime.now().isoformat()))
#         message_id += 1
#         return {"status": "Message saved"}
#     except Exception as e:
#         return HTTPException(status_code=400, detail=str(e))


# @app.post("/api/process_request")
# def process_request(request: Request):
#     bubble_id = (uuid.uuid4().hex)[:6]
#     logger.info(f"Processing request {bubble_id}")
#     _validate_request(bubble_id)
#     print('request: ', request.json)
#     question = request.json.get("request")
#     print('question: ', question)

#     query = collection.query(query_texts=[question], n_results=2, include=["documents"])
#     context = query["documents"]

#     prompt = PROMPT.format(context=context, question=question)
#     messages = []
#     if conversation.get_history() == []:
#         pass
#     else:
#         messages = conversation.to_dict()
#     messages.append({"role": "user", "content": prompt})
#     conversation.add_entry("user", question)

#     data = {"model": GPT_MODEL, "messages": messages, "temperature": 0.7}
#     headers = {"Content-Type": "application/json", "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"}
#     gpt_response = (requests.post(GPT_API_ENDPOINT, headers=headers, json=data)).json()

#     model = TypeAdapter(GPTResponse).validate_python(gpt_response)
#     answer = model.choices[0].message.content
#     conversation.add_entry("assistant", answer)

#     _generate_llm_log(bubble_id, context, model, data, gpt_response)
#     return JSONResponse(content={"status": f"Generated bubble {bubble_id}", "answer": answer})


if __name__ == "__main__":
    # for docker build, use this line:
    # app.run(debug=True, host='0.0.0.0', port=5000)
    uvicorn.run(create_app(), host="127.0.0.1", port=5000)