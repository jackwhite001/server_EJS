const successTemplate = require('../Template/success');
const errorTemplate = require('../Template/error');
const {
    getBooks,
    postBook,
    getBookById,
    editBook,
    deleteBook,
} = require('../services/bookServices');

const authHandler = req => {
    session = req.session;
    req.headers.authorization = 'Bearer ' + session.token;
};
const getBookHandler = async (req, res) => {
    try {
        authHandler(req);
        const result = await getBooks(req);
        let message = !result.data.result.data.length ? '' : result.data.result.message;
        return successTemplate(res, 'books', 'Books', message, session, result.data.result.data);
    } catch (e) {
        return errorTemplate(req, res, 'books', 'Books', e.response?.data.error.message, e);
    }
};

const getAddBookHandler = (req, res) => {
    try {
        session = req.session;
        return successTemplate(res, 'addBook', 'Add a Book', null, session);
    } catch (e) {
        return errorTemplate(req, res, 'books', 'Books', e.message);
    }
};
const addBookHandler = async (req, res) => {
    try {
        // post a book after pull new book list from session.books
        authHandler(req);
        const result = await postBook(req);
        const books = await getBooks(req);
        return successTemplate(
            res,
            'books',
            'Books',
            result.data.result.message,
            session,
            books.data.result.data
        );
    } catch (e) {
        return errorTemplate(req, res, 'addBook', 'addBook', e.response?.data.error.message, e);
    }
};
const getBookByIdHandler = async (req, res) => {
    try {
        authHandler(req);
        const book = await getBookById(req); // result = [{}]
        return successTemplate(
            res,
            'editBook',
            'EditBook',
            book.data.result.message,
            session,
            book.data.result.data[0]
        );
    } catch (e) {
        return errorTemplate(req, res, 'editBook', 'EditBook', e.response?.data.error, e);
    }
};
const editBookHandler = async (req, res) => {
    try {
        authHandler(req);
        const result = await editBook(req);
        const books = await getBooks(req);
        console.log('books', books);
        return successTemplate(
            res,
            'books',
            'Books',
            result.data.result.message,
            session,
            books.data.result.data
        );
    } catch (e) {
        return errorTemplate(req, res, 'editBook', 'EditBook', e.response?.data.error.message, e);
    }
};
const deleteBookByIdHandler = async (req, res) => {
    try {
        authHandler(req);
        const result = await deleteBook(req);
        const books = await getBooks(req);
        return successTemplate(
            res,
            'books',
            'Books',
            result.data.result.message,
            session,
            books.data.result.data
        );
    } catch (e) {
        return errorTemplate(req, res, 'books', 'Books', e.response?.data.error.message, e);
    }
};
module.exports = {
    getBookHandler,
    addBookHandler,
    getAddBookHandler,
    getBookByIdHandler,
    editBookHandler,
    deleteBookByIdHandler,
};
