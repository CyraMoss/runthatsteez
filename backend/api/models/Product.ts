import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
    name: string;
    price: number;
    description: string;
    mainImage: string;
    additionalImages: string[];
    category: string;
    brand: string;
    sizes: string[];
    colors: string[];
    material: string;
    stock: number;
    ratings: { userId: string; rating: number; comment: string }[];
    numReviews: number;
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    mainImage: { type: String, required: true },  // Main image
    additionalImages: { type: [String], required: false },  // Additional images
    category: { type: String, required: true },
    brand: { type: String, required: true },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    material: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
        },
    ],
    numReviews: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
