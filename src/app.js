import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

// middlewares para manejar json y datos por url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Servidor levantado y escuchando en el puerto ${PORT}`);
});