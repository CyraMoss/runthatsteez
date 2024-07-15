"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URI || 'your_backup_connection_string_here';
async function testConnection() {
    try {
        await mongoose_1.default.connect(url);
        console.log('Connected to MongoDB');
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}
testConnection();
