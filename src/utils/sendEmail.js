import nodemailer from 'nodemailer';
import { configObject } from '../config/config.js';
// const nodemailer = require('nodemailer')
// const { configObject } = require('../config/connectDB')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user,
        pass: configObject.gmail_pass
    }
    // auth: {
    //     user: 'er.rosas24@gmail.com', // Cambia esto por tu dirección de correo electrónico
    //     pass: 'nfjzyjcbzcvutnib' // Cambia esto por tu contraseña de correo electrónico
    // }
})


export const sendMail = async (to, subject, html) => await transport.sendMail({
    from: 'Coder test <er.rosas24@gmail.com>',
    to,
    subject ,
    html
})





// <div>
//     <center>
//         <h1>Cart Detail</h1>
//             {{#each carrito }}
//             <div class="card">
//                 <h5 class="card-title"><strong>Title: </strong>{{this.product.title}}</h5>
//                 <p class="card-text"><strong>Price: </strong>{{this.product.price}}</p>
//                 <a href="/productdetail/{{this.product._id}}">Ver detalle</a>
//                 <p class="card-text"><strong>Quantity: </strong>{{this.quantity}}</p>
//                 <button id="eliminar" class="btn btn-outline-danger" onclick="eliminarProduct('{{this.product._id}}')"><strong> Eliminar </strong></button>
//             </div>
//             {{/each}}
//         <div>
//             <p>Subtotal:</p>
//             <p>Total:</p>
//             <button id="terminar-compra" class="btn btn-outline-success">Terminar compra</button>
//         </div>
//     </center>
// </div>
// <script>
//     // funcion eliminarProduct con un fetch para eliminar que se ejecuta al hacer click en el boton
    
//     function getCIDFromURL() {
//         const url = window.location.href;
//         const parts = url.split('/');
//         return parts[parts.length - 1]; // Devuelve el último segmento de la URL, que debería ser el cid
//     }

//     // const eliminar = document.querySelector('#eliminar')
//     function eliminarProduct(pid) {
//         // event.preventDefault();
//         const cid = getCIDFromURL();
//         // const cid = localStorage.getItem('cid')
//         fetch(`/api/carts/${cid}/products/${pid}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         // .then(res => res.json())
//         .then(data => {
//             window.location.reload()            
//         })
//     }
//     // eliminar.addEventListener('click', eliminarProduct)
    

//     // generar ticket
//     const button = document.querySelector('#terminar-compra')
//     function generarTicket() {
//         console.log('generando ticket')


//         //const cid = localStorage.getItem('cid')
//         const cid = getCIDFromURL();
        
//         fetch(`/api/orders/${cid}`, {
//         // fetch(`/api/carts/${cid}/purchase`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         })
//     }
    
//     button.addEventListener('click', generarTicket)
// </script>