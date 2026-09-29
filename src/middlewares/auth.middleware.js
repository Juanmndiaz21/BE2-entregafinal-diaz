const passport = require('passport');

const authenticate = (req, res, next) => passport.authenticate('current', { session: false }, (error, user, info) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ status: 'error', message: info?.message || 'No autenticado o token invalido.' });
    req.user = user;
    return next();
})(req, res, next);

const authorization = (roles = []) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'Autenticacion requerida.' });
    if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ status: 'error', message: 'No tienes permisos para realizar esta accion.' });
    }
    return next();
};

module.exports = { authenticate, authorization };
