const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', authMiddleware, productController.createItem);
router.get('/read',authMiddleware, productController.getItems);
router.put('/update', authMiddleware, productController.updateItem);
router.delete('/delete',authMiddleware, productController.deleteItem);

module.exports = router;