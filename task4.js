const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

// Event listener for send button click
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        sendMessage(message);
        messageInput.value = '';
    }
});

// Event listener for pressing Enter key in the message input field
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Function to send message to the server
function sendMessage(message) {
    const data = {
        type: 'message',
        text: message
    };
    socket.send(JSON.stringify(data));
}

// Event listener for receiving messages from the server
socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message.text);
});

// Function to display a message in the chat box
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
