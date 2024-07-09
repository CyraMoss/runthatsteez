"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const db_1 = __importDefault(require("../db"));
const mongodb_1 = require("mongodb");
function createProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.default)();
        const result = yield db.collection('products').insertOne(product);
        product._id = result.insertedId;
        return product;
    });
}
exports.createProduct = createProduct;
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.default)();
        const products = yield db.collection('products').find().toArray();
        return products.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
        }));
    });
}
exports.getAllProducts = getAllProducts;
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.default)();
        const product = yield db.collection('products').findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!product)
            return null;
        return {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
        };
    });
}
exports.getProductById = getProductById;
