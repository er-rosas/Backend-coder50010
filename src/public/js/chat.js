const socket = io();

socket.emit("getMessages");

const chatbox = document.querySelector("#chatbox");
const sendButton = document.querySelector("#sendButton");

const sendMessage = () => {
    if (chatbox.value.trim().length > 0) {
        socket.emit("message", { user, message: chatbox.value });
        chatbox.value = "";
    }
};

chatbox.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
        sendMessage();
    }
});

sendButton.addEventListener("click", () => {
    sendMessage();
});

socket.on("messageLogs", (data) => {
    let messageLogs = document.querySelector("#messageLogs");
    let mensajes = "";
    data.forEach((mensaje) => {
        const date = new Date(mensaje.date);
        const time = date.toLocaleTimeString();
        mensajes += `
        <li class="message-li">
            <div class="li-p1">
                <p class="li-user">
                    ${mensaje.user}
                </p>
                <p class="li-message">
                    ${mensaje.message}
                </p>
            </div>
            <div class="li-p2">
                <p class="li-time">
                    ${time}
                </p>
            </div>
        </li>`;
    });
    messageLogs.innerHTML = mensajes;
});

socket.on("newUserConnected", (data) => {
    console.log(`Nuevo usuario conectado: ${data.first_name}`);
});