// @ts-ignore
const messageElement = document.getElementById('title') as HTMLElement;

fetch('http://127.0.0.1:5000')
    .then(response => response.text())
    .then(data => {
        if (messageElement) {
            messageElement.textContent = data;
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error)
    })

document.getElementById('messageForm')!.addEventListener('submit', async function(event) {
    event.preventDefault();
    const messageInput = (document.getElementById('messageInput') as HTMLInputElement).value;

    try {

        displayUserChatBubble(messageInput);

        const response = await fetch('http://127.0.0.1:5000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageInput })
        });

        if (response.ok) {
            const responseData = await response.json();
            const modifiedMessage = responseData.modified_message;
            displayServerChatBubble(modifiedMessage)
        }
        else {
            throw new Error('Failed to send message')
        }
    }

    catch (error) {
        console.error('Error sending message: ', error);
        displayServerChatBubble('Failed to send message');
    }
})

function displayServerChatBubble(message: string) {
    const chatMessagesElement = document.getElementById('chat-container')!;
    const chatBubbleElement = createChatBubble(message, 'server-bubble');
    chatMessagesElement.insertBefore(chatBubbleElement, chatMessagesElement.firstChild);
}

function displayUserChatBubble(message: string) {
    const chatMessagesElement = document.getElementById('chat-container')!;
    const chatBubbleElement = createChatBubble(message, 'user-bubble');
    chatMessagesElement.insertBefore(chatBubbleElement, chatMessagesElement.firstChild);
}

function createChatBubble(message: string, bubbleClass: string) {
    const chatBubbleElement = document.createElement('div');
    chatBubbleElement.classList.add('chat-bubble', bubbleClass);
    chatBubbleElement.textContent = message;
    return chatBubbleElement;
}