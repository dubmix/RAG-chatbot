import os
import uuid

import requests
from dotenv import load_dotenv
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from history import ConversationHistory
from logger import logger
from models import GPTResponse
from prompts import PROMPT
from pydantic import TypeAdapter
from settings import GPT_API_ENDPOINT, GPT_MODEL

import chromadb
from chromadb.utils import embedding_functions

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")  # type: ignore
host = os.getenv("HOST", "127.0.0.1")
chroma_port = int(os.getenv("CHROMA_PORT", 8000))

router = APIRouter()

client = chromadb.HttpClient(host=host, port=chroma_port)
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
)
collection = client.get_or_create_collection(name="asylumineurope", embedding_function=openai_ef)  # type: ignore
conversation = ConversationHistory()


# def _stringify_headers(headers):
#     header_string = ""
#     for key, value in headers.items():
#         header_string += f"{key}: {value}; "
#     return header_string.rstrip("; ")


# def _validate_request(bubble_id: str):
#     headers = _stringify_headers(request.headers)
#     logger.debug(f"{bubble_id} | HTTP request headers: {headers}")
#     method = request.method
#     logger.debug(f"{bubble_id} | HTTP request method: {method}")
#     url = request.url
#     logger.debug(f"{bubble_id} | HTTP request url: {url}")


def _generate_llm_log(bubble_id: str, context: list | None, model: GPTResponse, data: dict, gpt_response: dict):
    logger.info(f"{bubble_id} | Context: {context}")
    logger.info(f"{bubble_id} | Request made to OpenAI: {data}")
    logger.info(f"{bubble_id} | Response from OpenAI: {gpt_response}")
    logger.info(f"{bubble_id} | Prompt tokens used: {model.usage.prompt_tokens}")
    logger.info(f"{bubble_id} | Completion tokens used: {model.usage.completion_tokens}")
    logger.info(f"{bubble_id} | Total tokens used: {model.usage.total_tokens}")
    logger.info(f"Generated bubble {bubble_id}")


@router.post("/api/process_request")
async def process_request(request: Request):
    bubble_id = (uuid.uuid4().hex)[:6]
    logger.info(f"Processing request {bubble_id}")
    # _validate_request(bubble_id)
    data = await request.json()
    question = data["request"]

    query = collection.query(query_texts=[question], n_results=2, include=["documents"])
    context = query["documents"]

    prompt = PROMPT.format(context=context, question=question)
    messages = []
    if conversation.get_history() == []:
        pass
    else:
        messages = conversation.to_dict()
    messages.append({"role": "user", "content": prompt})
    conversation.add_entry("user", question)

    data = {"model": GPT_MODEL, "messages": messages, "temperature": 0.7}
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"}
    gpt_response = (requests.post(GPT_API_ENDPOINT, headers=headers, json=data)).json()

    model = TypeAdapter(GPTResponse).validate_python(gpt_response)
    answer = model.choices[0].message.content
    conversation.add_entry("assistant", answer)

    _generate_llm_log(bubble_id, context, model, data, gpt_response)
    return JSONResponse(content={"status": f"Generated bubble {bubble_id}", "answer": answer})
