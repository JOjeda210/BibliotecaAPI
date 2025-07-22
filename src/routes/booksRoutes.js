const express = require('express');
const booksController = require('../controllers/booksController.js');
const router = express.Router(); 


router.get('/', booksController.getalllibros);
router.post('/', booksController.createbook);
router.put('/:id', booksController.updatelibro);
router.delete('/:id', booksController.deletelibro);

module.exports = router;