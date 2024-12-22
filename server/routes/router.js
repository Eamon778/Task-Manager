const express = require('express')
const { allBooks, createBooks, singleBook, updateBook, deleteBook } = require('../controllers/controller')

const router = express.Router()

router.route('/books').get(allBooks).post(createBooks)
router.route('/books/:id').get(singleBook).patch(updateBook).delete(deleteBook)

module.exports = router