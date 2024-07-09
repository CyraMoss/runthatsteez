import ProductModel from '../models/product';
import { Product } from '../models/product';

export async function createProduct(product: Product): Promise<Product> {
  const newProduct = new ProductModel(product);
  await newProduct.save();
  return newProduct.toObject();
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await ProductModel.find().exec();
  return products.map(product => product.toObject());
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await ProductModel.findById(id).exec();
  return product ? product.toObject() : null;
}
