import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
    try {
        console.log('DATABASE_URL:', process.env.DATABASE_URL);
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`, );
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log('Mongo connection error: ', error); 
        process.exit(1)
    }
}; 

export default connectDB;