const express = require('express');
const bookRouter = express.Router();
const {
    getBookHandler,
    addBookHandler,
    getAddBookHandler,
    getBookByIdHandler,
    editBookHandler,
    deleteBookByIdHandler,
} = require('../handler/handleBook');

bookRouter.get('/', getBookHandler);
bookRouter.get('/addBook', getAddBookHandler);
bookRouter.post('/addBook', addBookHandler);
bookRouter.get('/editBook/:id', getBookByIdHandler);
bookRouter.post('/editBook', editBookHandler);
bookRouter.get('/deleteBook/:id', deleteBookByIdHandler);
module.exports = bookRouter;
