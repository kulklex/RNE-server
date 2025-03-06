import cloud from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import dotenv from "dotenv";

const cloudinary = cloud.v2

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "RNE-commerce",
        resource_type: "image",
        public_id: (req, file) => "computed-filename-using-request",
    }
})


const parser = multer({ storage: storage });

export {cloudinary, parser}