from pydantic import BaseModel


class SavedMessage(BaseModel):
    id: int
    text: str


class SavedMessages:
    def __init__(self):
        self.saved_messages = []

    def add_message(self, message):
        self.saved_messages.append(message)

    def get_messages(self):
        return self.saved_messages

    def get_messages_text(self):
        return [{"id": message.id, "text": message.text} for message in self.saved_messages]

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
