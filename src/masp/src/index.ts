// @ts-ignore
const messageElement = document.getElementById('title') as HTMLElement;

// for docker build, change port 5000 to 4443
fetch('http://127.0.0.1:5000/api/title')
    .then(response => response.text())
    .then(data => {
        if (messageElement) {
            messageElement.textContent = data;
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error)
    })

document.getElementById("menu-button")!.addEventListener("click", function() {
    const container = document.getElementById("container")!;
    container.classList.toggle("menu-open");
})

document.getElementById('messageForm')!.addEventListener('submit', async function(event) {
    event.preventDefault();

    const messageInput = (document.getElementById('messageInput') as HTMLInputElement).value;
    try {

        (document.getElementById('messageInput') as HTMLInputElement).value = '';

        displayUserChatBubble(messageInput);

        // for docker build, change port 5000 to 4443
        const response = await fetch('http://127.0.0.1:5000/api/process-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request: messageInput })
        });

        if (response.ok) {
            const responseData = await response.json();
            const backendResponse = responseData.answer;
            displayServerChatBubble(backendResponse)
        }
        else {
            throw new Error('Connection with backend server failed')
        }
    }

    catch (error) {
        console.error('Error sending message: ', error);
        displayServerChatBubble('Connection with backend server failed');
    }
})

// @ts-ignore
function displayServerChatBubble(message: string) {
    const chatMessagesElement = document.getElementById('chat-container')!;
    const chatBubbleElement = createChatBubble(message, 'server-bubble');
    chatMessagesElement.insertBefore(chatBubbleElement, chatMessagesElement.firstChild);
}

// @ts-ignore
function displayUserChatBubble(message: string) {
    const chatMessagesElement = document.getElementById('chat-container')!;
    const chatBubbleElement = createChatBubble(message, 'user-bubble');
    chatMessagesElement.insertBefore(chatBubbleElement, chatMessagesElement.firstChild);
}

// @ts-ignore
function createChatBubble(message: string, bubbleClass: string) {
    const chatBubbleElement = document.createElement('div');
    chatBubbleElement.classList.add('chat-bubble', bubbleClass);
    chatBubbleElement.textContent = message;
    return chatBubbleElement;
}