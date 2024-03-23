from pydantic import BaseModel
from typing import Optional

class GPTMessage(BaseModel):
    role: str
    content: str

class GPTChoice(BaseModel):
    message: GPTMessage
    logprobs: Optional[str]
    finish_reason: str
    index: int

class GPTUsage(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int

class GPTResponse(BaseModel):
    id: str
    object: str
    created: int
    model: str
    usage: GPTUsage
    choices: list[GPTChoice]