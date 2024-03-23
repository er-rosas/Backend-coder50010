import nodemailer from 'nodemailer';
import { configObject } from '../config/config.js';

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
});


export const sendMail = async (to, subject, html) => await transport.sendMail({
    from: 'Coder test <er.rosas24@gmail.com>',
    to,
    subject ,
    html
});