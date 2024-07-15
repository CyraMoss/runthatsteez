"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
async function createProduct(product) {
    const newProduct = new Product_1.default(product);
    await newProduct.save();
    return newProduct.toObject();
}
exports.createProduct = createProduct;
async function getAllProducts() {
    const products = await Product_1.default.find().exec();
    return products.map(product => product.toObject());
}
exports.getAllProducts = getAllProducts;
async function getProductById(id) {
    const product = await Product_1.default.findById(id).exec();
    return product ? product.toObject() : null;
}
exports.getProductById = getProductById;
async function updateProduct(id, productData) {
    const product = await Product_1.default.findByIdAndUpdate(id, productData, { new: true }).exec();
    return product ? product.toObject() : null;
}
exports.updateProduct = updateProduct;
async function deleteProduct(id) {
    const result = await Product_1.default.findByIdAndDelete(id).exec();
    return result !== null;
}
exports.deleteProduct = deleteProduct;
