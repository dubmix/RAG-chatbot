import pytest
from src.history import ConversationHistory


@pytest.fixture
def conversation():
    return ConversationHistory()


def test_conversation_history(conversation):
    assert conversation.get_history() == []
    conversation.add_entry("user", "What is the capital of France?")
    conversation.add_entry("assistant", "The capital of France is Paris.")
    assert conversation.to_dict() == [
        {"role": "user", "content": "What is the capital of France?"},
        {"role": "assistant", "content": "The capital of France is Paris."},
    ]
    conversation.clear_history()

    assert conversation.get_history() == []
    conversation.add_entry("user", "What is the capital of Germany?")
    assert conversation.to_dict() == [{"role": "user", "content": "What is the capital of Germany?"}]
    conversation.add_entry("assistant", "The capital of Germany is Berlin.")
    assert conversation.to_dict() == [
        {"role": "user", "content": "What is the capital of Germany?"},
        {"role": "assistant", "content": "The capital of Germany is Berlin."},
    ]

    conversation.clear_history()
    assert conversation.get_history() == []
    for i in range(20):
        conversation.add_entry("user", f"Question {i}")
    assert len(conversation.get_history()) == 10
