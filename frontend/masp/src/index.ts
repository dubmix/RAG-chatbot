// @ts-ignore
const MessageElement = document.getElementById('message') as HTMLElement;

fetch('http://127.0.0.1:5000')
    .then(response => response.text())
    .then(data => {
        if (MessageElement) {
            MessageElement.textContent = data;
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error)
    })