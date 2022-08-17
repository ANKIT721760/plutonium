
const express = require('express')
const BookController = require('../controllers/bookController')
const router = express.Router()

router.get('/bookList', BookController.getBook)
router.post('/createBook', BookController.createBook)
router.post('/getBooksInYear', BookController.bookYear)
router.get('/getXINRBooks', BookController.bookPrice)
router.get('/getRandomBooks', BookController.randomBook)
router.post('/getParticularBooks', BookController.particularBook)

module.exports = router