from models import GPTEntry


class ConversationHistory:
    def __init__(self):
        self.history = []

    def add_entry(self, role, content):
        if len(self.history) >= 10:
            self.history.pop(0)
        entry = GPTEntry(role=role, content=content)
        self.history.append(entry)

    def to_dict(self):
        return [{"role": entry.role, "content": entry.content} for entry in self.history]

    def get_history(self):
        return self.history

    def clear_history(self):
        self.history = []
