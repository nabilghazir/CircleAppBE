import multer from "multer";
import { CustomError } from "./error-handling";

const storage = multer.memoryStorage();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === ("image/")) {
            cb(null, true)
        } else {
            cb(new CustomError("Only images are allowed", 400))
        }
    }
})

export default upload