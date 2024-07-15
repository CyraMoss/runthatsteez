"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
// services/userService.ts
const User_1 = __importDefault(require("../models/User"));
const websocket_1 = __importDefault(require("../../websocket"));
async function getAllUsers() {
    const users = await User_1.default.find().exec();
    return users.map(user => user.toObject());
}
exports.getAllUsers = getAllUsers;
const getUserById = async (userId) => {
    return User_1.default.findById(userId).exec();
};
exports.getUserById = getUserById;
const createUser = async (userData) => {
    const newUser = new User_1.default(userData);
    await newUser.save();
    notifyClients({ type: 'USER_CREATED', data: newUser.toObject() });
    return newUser.toObject();
};
exports.createUser = createUser;
const updateUser = async (userId, userData) => {
    const updatedUser = await User_1.default.findByIdAndUpdate(userId, userData, { new: true }).exec();
    if (updatedUser) {
        notifyClients({ type: 'USER_UPDATED', data: updatedUser.toObject() });
    }
    return updatedUser ? updatedUser.toObject() : null;
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    const result = await User_1.default.findByIdAndDelete(userId).exec();
    if (result) {
        notifyClients({ type: 'USER_DELETED', data: result.toObject() });
    }
    return result !== null;
};
exports.deleteUser = deleteUser;
const notifyClients = (message) => {
    websocket_1.default.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};
