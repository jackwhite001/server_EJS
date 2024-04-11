const successTemplate = require('../Template/success');
const errorTemplate = require('../Template/error');
const {
    getAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorById,
} = require('../services/authorServices');
const { getAllBooksId } = require('../services/bookServices');
const messages = require('../utils/messages');
const authHandler = req => {
    session = req.session;
    req.headers.authorization = 'Bearer ' + session.token;
};

const getAuthorHandler = async (req, res) => {
    try {
        authHandler(req);
        const result = await getAuthors(req);
        console.log(result.data.result.data);
        return successTemplate(
            res,
            'authors',
            'Authors',
            result.data.result.message,
            session,
            result.data.result.data
        );
    } catch (e) {
        console.log('getauthor', e.response);
        return errorTemplate(req, res, 'authors', 'Authors', e.response?.data.error.message, e);
    }
};
const getAddAuthorHandler = async (req, res) => {
    try {
        authHandler(req);
        console.log('books=============', BookIds.data.result.data);
        return successTemplate(
            res,
            'addAuthor',
            'AddAuthor',
            BookIds.data.result.message,
            session,
            BookIds.data.result.data
        );
    } catch (e) {
        console.log('getadd', e.response.data.error);
        if (e.response.data.error.status != '500') {
            return errorTemplate(req, res, 'authors', 'Authos', messages.Book_not_found, e);
        }
        return errorTemplate(req, res, 'authors', 'Authors', e.response?.data.error.message, e);
    }
};
const AddAuthorHandler = async (req, res) => {
    try {
        authHandler(req);
        console.log('body', req.body);
        const result = await addAuthor(req);
        const authors = await getAuthors(req);
        return successTemplate(
            res,
            'authors',
            'Authors',
            result.data.result.message,
            session,
            authors.data.result.data
        );
    } catch (e) {
        console.log('addAuthor', e);
        return errorTemplate(req, res, 'addAuthor', 'AddAuthor', e.response?.data.error.message, e);
    }
};
const getAuthorByIdHandler = async (req, res) => {
    try {
        authHandler(req);
        console.log(req.body);
        const result = await getAuthorById(req);
        console.log(result);
        return successTemplate(
            res,
            'editAuthor',
            'EditAuthor',
            result.data.result.message,
            session,
            result.data.result.data
        );
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'editAuthor',
            'EditAuthor',
            e.response?.data.error.message,
            e
        );
    }
};
const editAuthorHandler = async (req, res) => {
    console.log(req.body.bookId);
    try {
        authHandler(req);
        const result = await updateAuthor(req);
        const authors = await getAuthors(req);
        return successTemplate(
            res,
            'authors',
            'Authors',
            result.data.result.message,
            session,
            authors.data.result.data
        );
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'editAuthor',
            'EditAuthor',
            e.response?.data.error.message,
            e
        );
    }
};
const deleteAuthorHandler = async (req, res) => {
    try {
        authHandler(req);
        const result = await deleteAuthor(req);
        const authors = await getAuthors(req);
        return successTemplate(
            res,
            'authors',
            'Authors',
            result.data.result.message,
            session,
            authors.data.result.data
        );
    } catch (e) {
        return errorTemplate(req, res, 'authors', 'Authors', e.response?.data.error.message, e);
    }
};
module.exports = {
    getAuthorHandler,
    getAddAuthorHandler,
    AddAuthorHandler,
    getAuthorByIdHandler,
    editAuthorHandler,
    deleteAuthorHandler,
};
