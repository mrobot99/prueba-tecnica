const express = require('express');
const { getBooks, createBook } = require('../controllers/bookController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getBooks);
router.post('/', authenticateToken, createBook);

// Agregar más rutas para actualizar y eliminar

module.exports = router;