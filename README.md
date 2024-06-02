# API REST con Sequelize y Express

API REST desarrollada con Express y Sequelize que ofrece funcionalidades de registro y autenticación de usuarios, CRUD de productos y categorías, gestión de pedidos, y CRUD de reviews. Utiliza bcrypt para el hashing de contraseñas y JWT para la autenticación de usuarios.

## Imagenes de la estructura de la BD en Mysql
![Captura de pantalla 2024-05-07 173808](https://github.com/SebasBarrientos/E-commerce-de-ropa/assets/117609894/af94d813-a3fe-44d4-8d2c-8cd2068d4aad)

## Relaciones
- `Muchos a Muchos`: Orders-Products & Categories-Products
- `Muchos a Uno`: Users-Orders / Products-Reviews / Users-Reviews / User-Tokens 

## Instalación

1. Clona el repositorio.

2. Instala las dependencias.

3. Configura el archivo de configuración según tus necesidades (por ejemplo, configuración de la base de datos en `config/database.js`).

4. Ejecuta las migraciones y los seeders.

## Uso

Para ejecutar el servidor, utiliza el siguiente comando: "npm run dev" o "npm start"

El servidor estará disponible en `http://localhost:3000`.

## Endpoints

### Categorías

- `POST /categorias`: Crea una nueva categoría. Requiere autenticación y permisos de administrador.
- `GET /categorias`: Obtiene todas las categorías.
- `PUT /categorias/id/:id`: Actualiza una categoría por su ID. Requiere autenticación y permisos de administrador.
- `DELETE /categorias/id/:id`: Elimina una categoría por su ID. Requiere autenticación y permisos de administrador.
- `GET /categorias/id/:id`: Obtiene una categoría por su ID.
- `GET /categorias/name/:name`: Obtiene una categoría por su nombre.

### Pedidos

- `POST /pedidos`: Crea un nuevo pedido. Requiere autenticación.
- `GET /pedidos`: Obtiene todos los pedidos. Requiere autenticación y permisos de administrador.
- `DELETE /pedidos/id/:id`: Elimina un pedido por su ID. Requiere autenticación y permisos de administrador.

### Productos

- `POST /productos`: Crea un nuevo producto. Requiere autenticación y permisos de administrador.
- `GET /productos`: Obtiene todos los productos.
- `PUT /productos/id/:id`: Actualiza un producto por su ID. Requiere autenticación y permisos de administrador.
- `DELETE /productos/id/:id`: Elimina un producto por su ID. Requiere autenticación y permisos de administrador.
- `GET /productos/id/:id`: Obtiene un producto por su ID.
- `GET /productos/name/:name`: Obtiene un producto por su nombre.
- `GET /productos/price`: Obtiene todos los productos ordenados por precio.
- `GET /productos/price/order`: Obtiene todos los productos ordenados por precio de forma descendente.

### Reviews

- `POST /reviews`: Crea una nueva review. Requiere autenticación.
- `GET /reviews`: Obtiene todas las reviews.
- `PUT /reviews/id/:id`: Actualiza una review por su ID. Requiere autenticación.
- `DELETE /reviews/id/:id`: Elimina una review por su ID. Requiere autenticación y permisos de administrador.

### Usuarios

- `POST /usuarios`: Crea un nuevo usuario.
- `GET /usuarios`: Obtiene todos los usuarios. Requiere autenticación y permisos de administrador.
- `GET /usuarios/id`: Obtiene un usuario por su ID. Requiere autenticación.
- `DELETE /usuarios/id/:id`: Elimina un usuario por su ID. Requiere autenticación y permisos de administrador.
- `PUT /usuarios`: Actualiza un usuario. Requiere autenticación.
- `POST /usuarios/login`: Inicia sesión de usuario.
- `DELETE /usuarios/logout`: Cierra sesión de usuario. Requiere autenticación.

## Contribución

¡Gracias por considerar contribuir al proyecto! Para contribuir, sigue estos pasos:

1. Crea un fork del proyecto.
2. Crea una rama para tu contribución.
3. Haz tus cambios y realiza commit.
4. Haz push a tu rama.
5. Envía una solicitud de extracción (Pull Request) desde tu repositorio a este repositorio.

## Autor

Sebastian Barrientos https://www.linkedin.com/in/sebasbarrientos/.
