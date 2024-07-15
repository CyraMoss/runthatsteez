"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productService_1 = require("../services/productService");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const product = await (0, productService_1.createProduct)(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const products = await (0, productService_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get products', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const product = await (0, productService_1.getProductById)(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get product', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const product = await (0, productService_1.updateProduct)(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const product = await (0, productService_1.deleteProduct)(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
});
exports.default = router;
