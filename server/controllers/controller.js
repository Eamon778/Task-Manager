const Book = require('../models/bookModel');

const allBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({success: true, count: books.length , data: books});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

const singleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({success: false, message: 'Book not found'});
        }
        return res.status(200).json({success: true, data: book});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

const createBooks = async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({success: false, message: 'Please provide title, author and pages'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook);
        return res.status(201).json({success: true, data: book});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({success: false, message: 'Book not found'});
        }
        Object.keys(req.body).forEach(key => {
            book[key] = req.body[key];
        });

        const updatedBook = await book.save();
        return res.status(200).json({success: true, data: updatedBook});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({success: false, message: 'Book not found'});
        }
        return res.status(200).json({success: true, message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = { allBooks, createBooks, singleBook, updateBook, deleteBook };