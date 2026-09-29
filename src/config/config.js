const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: Number(process.env.PORT || 8080),
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'ecommerce_jwt_secret_key_2026',
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASS: process.env.MAILER_PASS,
    MAILER_SERVICE: process.env.MAILER_SERVICE || 'gmail',
    RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL || 'http://localhost:8080/reset-password'
};
