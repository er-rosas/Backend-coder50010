import multer from 'multer'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname  = dirname(dirname(__filename))

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
        const uploadFolder = join(__dirname, `public/image/${folder}`); 

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
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