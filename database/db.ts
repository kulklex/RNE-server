import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URL) {
  throw new Error('DB_URL is not defined in environment variables');
}

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL!)
            .then(() => console.log("Connected to MongoDB"))
    } catch (error) {
        console.error(`Error connecting to DB: ${error}`);
    }
}

export default connect;
