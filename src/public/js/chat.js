// const socket = io();

// let user;

// Swal.fire({
//     title: "Login",
//     input: "text",
//     text: "Ingrese su correo de chat:",
//     inputValidator: (value) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(value)) {
//             return "Ingrese un correo válido para continuar.";
//         }
//         return !value && "Ingrese un correo válido para continuar.";
//     },
//     allowOutsideClick: false,
// }).then((result) => {
//     user = result.value;
//     socket.emit("getMessages", user);
// });

// const chatbox = document.querySelector("#chatbox");

// chatbox.addEventListener("keyup", (evt) => {
//     if (evt.key === "Enter") {
//         if (chatbox.value.trim().length > 0) {
//             socket.emit("message", { user, message: chatbox.value });
//             chatbox.value = "";
//         }
//     }
// });

// socket.on("messageLogs", (data) => {
//     let messageLogs = document.querySelector("#messageLogs");
//     let mensajes = "";
//     data.forEach((mensaje) => {
//         mensajes += `<li>${mensaje.user} dice: ${mensaje.message} - ${mensaje.hora}</li>`;
//     });
//     messageLogs.innerHTML = mensajes;
// });







// const socket = io();

// socket.emit("getMessages");

// const chatbox = document.querySelector("#chatbox");

// chatbox.addEventListener("keyup", (evt) => {
//     if (evt.key === "Enter") {
//         if (chatbox.value.trim().length > 0) {
//             socket.emit("message", { user, message: chatbox.value });
//             chatbox.value = "";
//         }
//     }
// });

// logButton.addEventListener("click", () => {
//     console.log("Botón de log presionado");
//     console.log("Información del usuario:", user);
// });

// socket.on("messageLogs", (data) => {
//     let messageLogs = document.querySelector("#messageLogs");
//     let mensajes = "";
//     data.forEach((mensaje) => {
//         mensajes += `<li>${mensaje.user.first_name} dice: ${mensaje.message} - ${mensaje.hora}</li>`;
//     });
//     messageLogs.innerHTML = mensajes;
// });

// socket.on("newUserConnected", (data) => {
//     console.log(`Nuevo usuario conectado: ${data.first_name}`);
//     // Puedes añadir lógica adicional aquí si quieres mostrar un mensaje en la UI
// });


const socket = io();

socket.emit("getMessages");

const chatbox = document.querySelector("#chatbox");
const sendButton = document.querySelector("#sendButton");
// const logButton = document.querySelector("#logButton");

// chatbox.addEventListener("keyup", (evt) => {
//     if (evt.key === "Enter" && chatbox.value.trim().length > 0) {
//         socket.emit("message", { user, message: chatbox.value });
//         console.log("Usuario " + user + "Mensaje: " + chatbox.value);
//         chatbox.value = "";
//     }
// });

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

// logButton.addEventListener("click", () => {
//     console.log("Botón de log presionado");
//     console.log("Información del usuario:", user);
// });

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
    // Puedes añadir lógica adicional aquí si quieres mostrar un mensaje en la UI
});