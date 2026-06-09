# Entrega N° 1 - Backend

Buenas! Esta es la primera entrega para el curso de Backend. El proyecto es un servidor armado con Node.js y Express que corre en el puerto 8080. Se encarga de manejar las rutas para gestionar los productos y los carritos de compra.

Toda la persistencia de datos la manejé utilizando FileSystem (con promesas), guardando la información en formato legible en los archivos `products.json` y `carts.json`.

## Rutas armadas

* **Productos (/api/products):** Tiene los endpoints para traer todos los productos (se le puede pasar un limit por query), buscar un producto puntual por ID, agregar productos nuevos (el ID se genera solo para que no haya repetidos), actualizar algún dato (bloqueando que se modifique el ID) y borrar productos.

* **Carritos (/api/carts):** Tiene los endpoints para crear un carrito nuevo vacío (también con ID automático), listar los productos que tiene adentro un carrito específico, y agregar productos (si el producto ya está en el carrito, directamente suma la cantidad).

## Cómo probar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la terminal en la carpeta principal del proyecto e instalar las dependencias con el comando:
   npm install

3. Levantar el servidor corriendo:
   npm start

Una vez que la consola muestre que el servidor está activo en el puerto 8080, ya se pueden probar todos los endpoints usando Postman.