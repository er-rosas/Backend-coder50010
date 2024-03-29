import winston from 'winston'
import { configObject } from '../config/config.js'
// const winston = require('winston')

// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({level: 'http'}),
//         new winston.transports.File({
//             filename: './errors.log', 
//             level: 'warn'
//         })
//     ]
// })

//const {logger_level_console, logger_level_file} = configObject

const levelOptions = {
    levels: {
        fatal: 0,
        error:1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5
    },
    colors: {
        fatal: 'bold red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        debug: 'magenta',
        http: 'green'
    }
}
const logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'http',
            //level: configObject.logger_level_console,
            format: winston.format.combine(
                winston.format.colorize({ colors: levelOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            //level: configObject.logger_level_file,
            format: winston.format.simple()
        })
    ]
})

// middleware
const addLogger = (req, res, next) => {
    req.logger = logger
    // req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    // next()
    const start = Date.now(); // Tiempo inicial de la solicitud
    const { method, url } = req;

    res.on('finish', () => {
        const ms = Date.now() - start; // Calcula los milisegundos transcurridos

        // Utiliza el código de estado del response
        const status = res.statusCode;

        // Registra la información completa
        req.logger.info(`${method} en ${url} - Status: ${status} - ${ms} ms - ${new Date().toLocaleTimeString()}`);
    });

    next();
} 

export {
    addLogger,
    logger
}