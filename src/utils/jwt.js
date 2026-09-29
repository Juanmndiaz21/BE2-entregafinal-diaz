const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');

const generateToken = (user) => {
    const payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        cart: user.cart,
        role: user.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

const generatePasswordResetToken = (user) => jwt.sign(
    { id: user._id, email: user.email, purpose: 'password-reset' },
    JWT_SECRET,
    { expiresIn: '1h' }
);

const verifyPasswordResetToken = (token) => {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.purpose !== 'password-reset') throw new Error('Invalid reset token purpose');
    return payload;
};

module.exports = {
    JWT_SECRET,
    generateToken,
    generatePasswordResetToken,
    verifyPasswordResetToken
};