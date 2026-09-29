# Backend Ecommerce - Entrega Final

Servidor backend desarrollado con Node.js, Express y MongoDB, enfocado en una arquitectura profesional en capas, patron Repository con DAO, DTO para proteccion de datos sensibles, control de acceso por roles (RBAC) y sistema de mailing para recuperacion de contraseña.

## Requisitos previos

- Node.js (version 18 o superior recomendada)
- MongoDB local o cluster en MongoDB Atlas
- Cuenta de correo configurada para envio por SMTP (por ejemplo Gmail con contraseña de aplicacion)

## Instalacion

1. Clonar el repositorio o descargar el proyecto.
2. Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto tomando como referencia el archivo `.env.example`:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=tu_clave_secreta_jwt
MAILER_SERVICE=gmail
MAILER_USER=tu_email@gmail.com
MAILER_PASS=tu_app_password
RESET_PASSWORD_URL=http://localhost:8080/reset-password
```

## Ejecucion

- Modo desarrollo:

```bash
npm run dev
```

- Modo produccion:

```bash
npm start
```

## Estructura del proyecto

- `src/config/`: Configuracion de variables de entorno y estrategia de Passport JWT.
- `src/controllers/`: Controladores con la logica de cada ruta.
- `src/dao/`: Capa de acceso a datos (Data Access Object) con Mongoose.
- `src/dto/`: Objetos de transferencia de datos para envio de informacion no sensible.
- `src/middlewares/`: Middlewares de autenticacion y autorizacion segun roles.
- `src/models/`: Esquemas y modelos de Mongoose (User, Product, Cart, Ticket).
- `src/repositories/`: Patron Repository para aislar la capa DAO de los controladores.
- `src/routes/`: Definicion de endpoints de la aplicacion.
- `src/utils/`: Utilidades para hashing de contraseñas, generacion de tokens y envio de correos.

## Principales endpoints

### Sesiones (`/api/sessions`)

- `POST /register`: Registro de usuario con creacion automatica de carrito.
- `POST /login`: Inicio de sesion, genera token JWT almacenado en cookie y devuelto en la respuesta.
- `GET /current`: Obtiene los datos del usuario autenticado a traves de UserDTO (sin contraseña).
- `POST /forgot-password`: Envia correo con token temporal (valido por 1 hora) para restablecer la contraseña.
- `POST /reset-password`: Restablece la contraseña validando que el token no haya expirado y que la nueva contraseña no coincida con la anterior.

### Productos (`/api/products`)

- `GET /`: Listar todos los productos (publico).
- `POST /`: Crear producto (requiere rol admin).
- `PUT /:pid`: Actualizar producto (requiere rol admin).
- `DELETE /:pid`: Eliminar producto (requiere rol admin).

### Carritos (`/api/carts`)

- `POST /:cid/products/:pid`: Agregar producto al carrito (requiere rol user).
- `POST /:cid/purchase`: Finalizar compra, validar stock, generar ticket de compra y actualizar productos pendientes en el carrito (requiere rol user).
# BE2-entrega-final-diaz
# BE2-entrega-final-diaz
