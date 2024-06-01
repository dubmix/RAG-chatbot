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

from fastapi import FastAPI, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import psycopg2

from process_request import router as process_request_router
from saved_messages import router as process_saved_messages 


def get_lifespan():

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        saved_messages = SavedMessages()
        app.state.saved_messages = saved_messages
        yield
    return lifespan

def app():

    connection = psycopg2.connect(
        user="postgres",
        password="postgres",
        host="0.0.0.0",
        port="5432",
        database="ragchatbot"
    )

    app = FastAPI(lifespan=get_lifespan())

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
    
    app.include_router(process_request_router)
    app.include_router(process_saved_messages)

    return app

#app.logger.handlers = logger.handlers
# wip, using 2>> to redirect stderr logs to flask.log
#app.logger.removeHandler(default_handler)
#app.logger.setLevel(logger.level)

# for docker build, use this line:
# client = chromadb.HttpClient(host="chroma", port=8000)

#app.logger.info("Server ready")




if __name__ == "__main__":
    # for docker build, use this line:
    # app.run(debug=True, host='0.0.0.0', port=5000)
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)