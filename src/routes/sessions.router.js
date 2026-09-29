const { Router } = require('express');
const controller = require('../controllers/sessions.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/current', authenticate, controller.current);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);

module.exports = router;
