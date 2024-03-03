// socket.addEventListener("open", (event) => {
//   socket.send("Hello Server!");
// });


// socket.on('send name', (username) => {
// });

// socket.on('send message', (chat) => {
// });

const socket = new WebSocket("wss://server.stio.studio/aioewa/chat-ws");

const form = document.getElementById('form');
const user = addonsSettings?.["chat tab"]?.userName != undefined ? addonsSettings?.["chat tab"]?.userName : "Random User"
const message = document.getElementById('message');
const messageArea = document.getElementById('messageArea');


function createJSON() {
    return {

    }
}

// Create WebSocket connection.
// Connection opened
socket.addEventListener("open", (event) => {
    socket.send(JSON.stringify(
        {
            type: "get",
            do: "get all messages"
        }
    ));
    
    function sendMessage(e) {
            e.preventDefault();
    
            if (message.value) {
                socket.send(JSON.stringify(
                    {
                        type: "set",
                        do: "send message",
                        text: message.value,
                        user: user
                    }
                ));
            }
    
            message.value = ""
    }
    form.addEventListener('submit', sendMessage);
    form.addEventListener("keydown", (e)=>{
        if(e.key == "Enter" && !e.shiftKey) {
            sendMessage(e)
        }
    });
});


// Listen for messages
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data)
    const eventPath = data.callBack_type + " / " + data.callBack_do
    const input = data[eventPath]
    
    console.log(data, eventPath, input);
    switch (eventPath) {
        case "set / send message":
            appendMessage(input.user, input.text)            
            break;

        case "get / get all messages":
            input.forEach(message => {
                appendMessage(message.user, message.text)
            });
            setTimeout(()=>{
                messageArea.scrollTop = messageArea.scrollHeight
            }, 100)
            break;
    
        default:
            break;
    }
});

function appendMessage(_user, _text) {
    const message = document.createElement("div")
    message.className = "message"
    
    const name = document.createElement("div");
    name.className = "username"
    name.innerText = _user;
    message.append(name);
    
    const chatContent = document.createElement("div");
    chatContent.className = "text"
    chatContent.innerText = _text;
    message.append(chatContent);

    if(Math.abs(messageArea.scrollTop + messageArea.clientHeight - messageArea.scrollHeight) < 5 ) {
        messageArea.append(message)
        messageArea.scrollTop = messageArea.scrollHeight
    }
    else {
        messageArea.append(message)
    }
}