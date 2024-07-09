import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDatabase from './db';
import ProductModel from './models/product';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './services/productService';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

connectToDatabase().then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/products', async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get products', error });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get product', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
