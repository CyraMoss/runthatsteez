"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = process.env.MONGODB_URI || 'mongodb+srv://cyramoss:dKcZNdWnMr60Dk0i@cluster0.w4touyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let client;
async function connectToDatabase() {
    if (!client) {
        client = new mongodb_1.MongoClient(url);
        await client.connect();
    }
    return client;
}
exports.default = connectToDatabase;
