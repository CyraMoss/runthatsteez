"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URI || 'mongodb+srv://cyramoss:dKcZNdWnMr60Dk0i@cluster0.w4touyd.mongodb.net/runthatsteez?retryWrites=true&w=majority&appName=Cluster0';
// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(url);
        console.log('Connected to MongoDB');
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}
exports.default = connectToDatabase;
