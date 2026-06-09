import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                return [];
            }
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer los productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id) || null;
    }

    async addProduct(productData) {
        const products = await this.getProducts();
        

        const { title, description, code, price, stock, category, thumbnails } = productData;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Faltan campos obligatorios");
        }


        if (products.some(p => p.code === code)) {
            throw new Error("El código del producto ya existe");
        }

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            code,
            price,
            status: productData.status ?? true,
            stock,
            category,
            thumbnails: thumbnails || []
        };

        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updateData) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) return null;

        // evitamos que se modifique el id
        delete updateData.id;

        products[index] = { ...products[index], ...updateData };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const initialLength = products.length;
        
        products = products.filter(p => p.id !== id);
        
        if (products.length === initialLength) return false;

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return true;
    }
}