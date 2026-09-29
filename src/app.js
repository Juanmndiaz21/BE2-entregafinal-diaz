const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { PORT, MONGO_URI } = require('./config/config');
const initializePassport = require('./config/passport.config');
const sessionsRouter = require('./routes/sessions.router');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Servidor activo en el puerto ' + PORT);
        });
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    });

module.exports = app;