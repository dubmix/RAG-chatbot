from typing import Optional

from pydantic import BaseModel


class GPTEntry(BaseModel):
    role: str
    content: str


class GPTChoice(BaseModel):
    message: GPTEntry
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
