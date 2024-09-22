import React, { useState } from 'react';
import '../styles/chatbox.css';
import '../styles/login.css';
import '../styles/global.css';
import { baseUrl } from '../App.tsx';


const Chat: React.FC = () => {
    const [messageInput, setMessageInput] = useState<string>('');
    const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);
    const [showHelpBubbles, setShowHelpBubbles] = useState<boolean>(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!messageInput.trim()) return;
        displayUserChatBubble(messageInput);
        setMessageInput('');

        fetch(`${baseUrl}/api/process_request`, {
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
            displayServerChatBubble('Connection with backend server failed / This is a test for bigger bubbles');
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
        
        fetch(`${baseUrl}/api/save_message`, {
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
        // chatBubbleElement.innerHTML = message;

        const logoElement = document.createElement('img');
        logoElement.src = 'hilfy.png';
        logoElement.alt = 'Logo';
        logoElement.style.width = '20px';
        logoElement.classList.add('chat-logo');

        const messageElement = document.createElement('span');
        const formattedMessage = message.replace(/(.{20})/g, '$1<br>');
        messageElement.innerHTML = formattedMessage;
        messageElement.innerHTML = message;

        
        if (bubbleType === 'server-bubble') {
            chatBubbleElement.appendChild(logoElement);
            chatBubbleElement.ondblclick = () => handleDoubleClick(message);
        }
        chatBubbleElement.appendChild(messageElement);
        return chatBubbleElement;
    }

    return (
        <>
        <div className="chat-wrapper">
            <div id="chat-container">
                <div className={`help-bubbles ${showHelpBubbles ? '' : 'hide'}`}>
                        <div className="help-bubble">What are my rights as a refugee?</div>
                        <div className="help-bubble">How do I apply for asylum in Germany?</div>
                </div>
            </div>

            {showSavedMessage && <div className="saved-message">Message saved!</div>}

            <form id="messageForm-2" onSubmit={handleSubmit} onFocus={() => setShowHelpBubbles(false)}>
                {/* <div className="input-container"> */}
                    <input type="text" 
                        id="messageInput" 
                        value={messageInput}
                        autoComplete='off'
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Ask me anything..."
                    />
                    <button className="unlock-button" type="submit">
                        <img src="unlock.png" alt="Unlock" />
                    </button>
                {/* </div> */}
            </form>
        </div>
        </>
    )
};

export default Chat;