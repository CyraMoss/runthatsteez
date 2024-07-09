import mongoose from 'mongoose';
import dotenv from 'dotenv';

const url = process.env.MONGODB_URI || 'mongodb+srv://cyramoss:dKcZNdWnMr60Dk0i@cluster0.w4touyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

export default connectToDatabase;
