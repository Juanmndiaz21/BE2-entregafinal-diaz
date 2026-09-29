const { userRepository, cartRepository } = require('../repositories');
const UserDTO = require('../dto/user.dto');
const { createHash, isValidPassword } = require('../utils/bcrypt');
const { generateToken, generatePasswordResetToken, verifyPasswordResetToken } = require('../utils/jwt');
const { sendPasswordResetEmail } = require('../utils/mailer');

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !age || !password) return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios.' });
        if (await userRepository.findByEmail(email)) return res.status(409).json({ status: 'error', message: 'El correo electronico ya se encuentra registrado.' });
        const cart = await cartRepository.create({ products: [] });
        const user = await userRepository.create({ first_name, last_name, email, age, password: createHash(password), cart: cart._id, role: 'user' });
        return res.status(201).json({ status: 'success', message: 'Usuario registrado exitosamente.', payload: new UserDTO(user) });
    } catch (error) { return res.status(500).json({ status: 'error', message: error.message }); }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ status: 'error', message: 'Debe ingresar email y password.' });
        const user = await userRepository.findByEmail(email);
        if (!user || !isValidPassword(user, password)) return res.status(401).json({ status: 'error', message: 'Credenciales invalidas.' });
        const token = generateToken(user);
        return res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({ status: 'success', message: 'Inicio de sesion exitoso.', token });
    } catch (error) { return res.status(500).json({ status: 'error', message: error.message }); }
};

const current = (req, res) => res.status(200).json({ status: 'success', payload: new UserDTO(req.user) });

const forgotPassword = async (req, res) => {
    try {
        const user = await userRepository.findByEmail(req.body.email);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado.' });
        const token = generatePasswordResetToken(user);
        await sendPasswordResetEmail(user.email, token);
        return res.status(200).json({ status: 'success', message: 'Correo de recuperacion enviado.' });
    } catch (error) { return res.status(500).json({ status: 'error', message: error.message }); }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ status: 'error', message: 'Token y nueva contraseña son obligatorios.' });
        let payload;
        try { payload = verifyPasswordResetToken(token); } catch (error) {
            return res.status(401).json({ status: 'error', code: 'RESET_TOKEN_INVALID_OR_EXPIRED', message: 'El token es invalido o expiro. Solicita un nuevo enlace.' });
        }
        const user = await userRepository.findById(payload.id);
        if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado.' });
        // contraseña no puede coincidir con el hash guardado
        if (isValidPassword(user, newPassword)) return res.status(400).json({ status: 'error', message: 'La nueva contraseña no puede ser igual a la contraseña actual.' });
        await userRepository.updatePassword(user._id, createHash(newPassword));
        return res.status(200).json({ status: 'success', message: 'Contraseña actualizada correctamente.' });
    } catch (error) { return res.status(500).json({ status: 'error', message: error.message }); }
};

module.exports = { register, login, current, forgotPassword, resetPassword };
