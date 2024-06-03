
// NO ME FUNCIONA PERO CON EL UTILS A NIVEL DEL SRC SI FUNCIONA

import multer from 'multer'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname  = dirname(dirname(__filename))
// export const viewsDir = join(__dirname, '..', 'views');

// const storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//         callback(null, `${__dirname}/public/image`)
//     },
//     filename: function (request, file, callback) {
//         callback(null, `${Date.now()}-${file.originalname}`)
//     }
// })


// const storage = multer.diskStorage({
//     destination:  function(req, file, cb) {
//         cb(null, `${dirname(__dirname)}/public/image/profile`)
//     },
//     filename: function(req, file, cb) {
//         console.log('file: ',file)
//         cb(null, `${Date.now()}-${file.originalname}`)        
//     }
// })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//     let folder = '';
//     if (file.fieldname === 'profile') {
//         folder = 'profiles';
//     } 
//     if (file.fieldname === 'products') {
//         folder = 'products';
//     } 
//     if (file.fieldname === 'documents'){
//         folder = `documents`; // Carpeta específica para el usuario
//     }
//     const uploadFolder = `/public/image/${folder}`; // Carpeta de destino

//     if (!fs.existsSync(uploadFolder)) {
//         fs.mkdirSync(uploadFolder, { recursive: true }); // Crear la carpeta de destino si no existe
//     }
//     cb(null, uploadFolder)
//     },
//     filename: (req, file, cb) => {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, Date.now() + '-' + file.originalname)
//     },
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';
        if (file.fieldname === 'profile') {
            folder = 'profiles';
        } 
        if (file.fieldname === 'products') {
            folder = 'products';
        } 
        if (file.fieldname === 'documents'){
            folder = 'documents';
        }
        const uploadFolder = join(__dirname, `public/image/${folder}`); // Corrected the folder path

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true }); // Create the destination folder if it doesn't exist
        }
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
});


const uploader = multer({ 
    storage, 
    onError: function(err,next){
        console.log(err)
        next()
    }
})

export {
    uploader
}

// export const uploader = multer({
//     storage
// })