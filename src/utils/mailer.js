const nodemailer = require('nodemailer');
const { MAILER_SERVICE, MAILER_USER, MAILER_PASS, RESET_PASSWORD_URL } = require('../config/config');

const transporter = nodemailer.createTransport({
    service: MAILER_SERVICE,
    auth: { user: MAILER_USER, pass: MAILER_PASS }
});

const sendPasswordResetEmail = (email, token) => transporter.sendMail({
    from: MAILER_USER,
    to: email,
    subject: 'Recuperacion de contraseña',
    html: `<p>Solicitaste cambiar tu contraseña.</p><p><a href="${RESET_PASSWORD_URL}?token=${encodeURIComponent(token)}">Restablecer contraseña</a></p><p>El enlace expira en 1 hora.</p>`
});

module.exports = { sendPasswordResetEmail };
