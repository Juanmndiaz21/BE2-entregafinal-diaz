const { Router } = require('express');
const controller = require('../controllers/carts.controller');
const { authenticate, authorization } = require('../middlewares/auth.middleware');

const router = Router();
router.post('/:cid/products/:pid', authenticate, authorization(['user']), controller.addProduct);
router.post('/:cid/purchase', authenticate, authorization(['user']), controller.purchase);

module.exports = router;
