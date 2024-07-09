import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI || 'your_backup_connection_string_here';

async function testConnection() {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
        mongoose.connection.close();
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

testConnection();
