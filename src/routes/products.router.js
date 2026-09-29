const { Router } = require('express');
const controller = require('../controllers/products.controller');
const { authenticate, authorization } = require('../middlewares/auth.middleware');

const router = Router();
router.get('/', controller.getProducts);
router.post('/', authenticate, authorization(['admin']), controller.createProduct);
router.put('/:pid', authenticate, authorization(['admin']), controller.updateProduct);
router.delete('/:pid', authenticate, authorization(['admin']), controller.deleteProduct);

module.exports = router;
