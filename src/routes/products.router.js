import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        let products = await manager.getProducts();
        
        if (limit) {
            products = products.slice(0, parseInt(limit));
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await manager.getProductById(parseInt(req.params.pid));
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await manager.addProduct(req.body);
        res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const updatedProduct = await manager.updateProduct(parseInt(req.params.pid), req.body);
        if (!updatedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await manager.deleteProduct(parseInt(req.params.pid));
        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;