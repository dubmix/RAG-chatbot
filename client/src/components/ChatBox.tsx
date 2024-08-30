import React, { useState } from 'react';
import '../styles/chatbox.css';
import '../styles/global.css';

const apiBaseHost = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1';
const apiBasePort = process.env.REACT_APP_PORT || '8080';


const Chat: React.FC = () => {
    const [messageInput, setMessageInput] = useState<string>('');
    const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);
    const [showHelpBubbles, setShowHelpBubbles] = useState<boolean>(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!messageInput.trim()) return;
        displayUserChatBubble(messageInput);
        setMessageInput('');

        fetch('${apiBaseHost}:${apiBasePort}/api/process_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ request: messageInput })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Connection with backend server failed');
            }
        })
        .then(responseData => {
            const backendResponse = responseData.answer;
            displayServerChatBubble(backendResponse);
        })
        .catch(error => {
            console.error('Error sending message: ', error);
            displayServerChatBubble('Connection with backend server failed');
        });
    };

    const displayServerChatBubble = (message: string) => {
        const chatMessagesElement = document.getElementById('chat-container')!;
        const chatBubbleElement = createChatBubble(message, 'server-bubble');
        chatMessagesElement.insertBefore(chatBubbleElement, chatMessagesElement.firstChild);
    }

    const displayUserChatBubble = (message: string) => {
        const chatMessagesElement = document.getElementById('chat-container')!;
        const chatBubbleElement = createChatBubble(message, 'user-bubble');
        chatMessagesElement.insertBefore(chatBubbleElement, chatMessagesElement.firstChild);
    }

    const handleDoubleClick = (message: string) => {
        
        fetch('${apiBaseHost}:${apiBasePort}/api/save_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save message');
            }
            setShowSavedMessage(true);
            setTimeout(() => {setShowSavedMessage(false)}, 2000);
            const chatBubbleElement = document.querySelectorAll('.chat-bubble');
            chatBubbleElement.forEach((chatBubbleElement) => {
                if (chatBubbleElement.textContent === message) {
                    const starElement = document.createElement('div');
                    starElement.className = 'star';
                    starElement.innerHTML = '<img src="star_yellow.png" alt="Star">';
                    chatBubbleElement.appendChild(starElement);
                }
            });
        })
        .catch(error => console.error(error));
    };

    const createChatBubble = (message: string, bubbleType: string) => {
        const chatBubbleElement = document.createElement('div');
        chatBubbleElement.className = `chat-bubble ${bubbleType}`;
        chatBubbleElement.innerHTML = message;

        if (bubbleType === 'server-bubble') {
            chatBubbleElement.ondblclick = () => handleDoubleClick(message);
        }
        return chatBubbleElement;
    }

    return (
        <>
        <div id="chat-container">
            <div className={`help-bubbles ${showHelpBubbles ? '' : 'hide'}`}>
                    <div className="help-bubble">What are my rights as a refugee?</div>
                    <div className="help-bubble">How do I apply for asylum in Germany?</div>
            </div>
        </div>

        {showSavedMessage && <div className="saved-message">Message saved!</div>}

        <form id="messageForm" onSubmit={handleSubmit} onFocus={() => setShowHelpBubbles(false)}>
            <div className="input-container">
                <input type="text" 
                    id="messageInput" 
                    placeholder="Ask me anything..."
                    value={messageInput}
                    autoComplete='off'
                    onChange={(e) => setMessageInput(e.target.value)} />
                <button type="submit">Send</button>
            </div>
        </form>
        </>
    )
};

export default Chat;