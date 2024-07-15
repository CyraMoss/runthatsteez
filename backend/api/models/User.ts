import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    name?: string;
    email: string;
    emailVerified?: Date;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string;
    role: string;
    sessions: { sessionToken: string; expires: Date }[];
    products: mongoose.Types.ObjectId[]; // Reference to products owned by the user
}

const userSchema: Schema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date, required: false },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    image: { type: String, required: false },
    role: { type: String, default: 'CUSTOMER', required: true },
    sessions: [
        {
            sessionToken: { type: String, required: true, unique: true },
            expires: { type: Date, required: true },
        },
    ],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true,
    collection: 'User'
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
