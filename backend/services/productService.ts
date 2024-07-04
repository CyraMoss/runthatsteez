import connect from '../db';
import { Product } from '../models/Product';
import { ObjectId } from 'mongodb';

export async function createProduct(data: Product) {
  const db = await connect();
  const result = await db.collection('products').insertOne(data);
  // Use the insertedId to fetch the newly inserted document
  const newProduct = await db.collection('products').findOne({ _id: result.insertedId });
  return newProduct;
}

export async function getAllProducts() {
  const db = await connect();
  return await db.collection('products').find().toArray();
}

export async function getProductById(id: string) {
  const db = await connect();
  return await db.collection('products').findOne({ _id: new ObjectId(id) });
}
