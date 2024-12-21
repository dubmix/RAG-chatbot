from datetime import datetime

from fastapi import HTTPException, Request
from fastapi.routing import APIRouter
from pydantic import BaseModel


class SavedMessage(BaseModel):
    id: int
    text: str
    date: str


class SavedMessages:
    def __init__(self):
        self.saved_messages = []
        self.message_id = 0

    def add_message(self, message):
        self.saved_messages.append(message)

    def get_messages(self):
        return self.saved_messages

    def get_all_messages(self):
        return [{"id": message.id, "text": message.text, "date": message.date} for message in self.saved_messages]

    def clear_messages(self):
        self.saved_messages = []

    def get_message(self, index) -> str | None:
        for saved_message in self.saved_messages:
            if saved_message.id == index:
                return saved_message.text
        return None

    def delete_message(self, index):
        for saved_message in self.saved_messages:
            if saved_message.id == index:
                self.saved_messages.remove(saved_message)
        return


router = APIRouter()


@router.get("/api/saved_messages")
def saved_messages(request: Request):
    return request.app.state.saved_messages.get_all_messages()


@router.post("/api/save_message", status_code=201)
async def add_savedmessage(request: Request):
    saved_msgs = request.app.state.saved_messages
    message_id = saved_msgs.message_id

    try:
        data = await request.json()
        for saved_message in saved_msgs.get_messages():
            if saved_message.text == data["message"]:  # type: ignore
                raise HTTPException(status_code=400, detail="Message already saved")
        saved_msgs.add_message(
            SavedMessage(
                id=message_id,
                text=data["message"],  # type: ignore
                date=datetime.now().isoformat(),
            )
        )
        saved_msgs.message_id += 1
        print("mess id: ", saved_msgs.message_id)
        print("saved: ", saved_msgs.get_all_messages())
        return {"status": "Message saved"}
    except Exception as e:
        return HTTPException(status_code=400, detail=str(e))
