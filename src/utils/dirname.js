
// NO ME FUNCIONA PERO CON EL UTILS A NIVEL DEL SRC SI FUNCIONA

import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname  = dirname(dirname(__filename))
// export const viewsDir = join(__dirname, '..', 'views');

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, `${__dirname}/public/image`)
    },
    filename: function (request, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({
    storage
})