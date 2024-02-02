import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from "path";


type FileNameCallback = (error: Error | null, filename: string) => void;


const destination = path.resolve('tmp');

const storage = multer.diskStorage({
    destination,
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}}`;
        const fileName = `${uniquePrefix}_${file.originalname}`;
        cb(null, fileName);
    }
})



export const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}




const limits = {
    fileSize: 1024 * 1024 * 5,
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;