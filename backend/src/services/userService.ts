// services/userService.ts
import UserModel, { User } from '../models/User';
import wss from '../../websocket';

export async function getAllUsers(): Promise<User[]> {
  const users = await UserModel.find().exec();
  return users.map(user => user.toObject());
}

export const getUserById = async (userId: string): Promise<User | null> => {
  return UserModel.findById(userId).exec();
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const newUser = new UserModel(userData);
  await newUser.save();
  notifyClients({ type: 'USER_CREATED', data: newUser.toObject() });
  return newUser.toObject();
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
  if (updatedUser) {
    notifyClients({ type: 'USER_UPDATED', data: updatedUser.toObject() });
  }
  return updatedUser ? updatedUser.toObject() : null;
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await UserModel.findByIdAndDelete(userId).exec();
  if (result) {
    notifyClients({ type: 'USER_DELETED', data: result.toObject() });
  }
  return result !== null;
};

const notifyClients = (message: any) => {
  wss.clients.forEach((client: any) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};
