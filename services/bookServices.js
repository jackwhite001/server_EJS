const $axios = require('axios');
require('dotenv').config();

const handlerGetAuth = req => {
    return ($axios.defaults.headers.get['Authorization'] = req.headers.authorization);
};
const handlerPostAuth = req => {
    return ($axios.defaults.headers.post['Authorization'] = req.headers.authorization);
};
const handlerPutAuth = req => {
    return ($axios.defaults.headers.put['Authorization'] = req.headers.authorization);
};
const handlerDeleteAuth = req => {
    return ($axios.defaults.headers.delete['Authorization'] = req.headers.authorization);
};
const getBooks = async req => {
    handlerGetAuth(req);
    return await $axios.get(process.env.BOOK_URL);
};
const getAllBooksId = async req => {
    handlerGetAuth(req);
    return await $axios.get(process.env.BOOK_URL + 'books');
};
const postBook = async req => {
    return await $axios.post(
        process.env.BOOK_URL,
        {
            title: req.body.title,
            author: req.body.author,
            ISBN: req.body.ISBN,
            numberOfPages: req.body.numberOfPages,
            price: req.body.price,
            yearPublished: req.body.yearPublished,
        },
        handlerPostAuth(req)
    );
};

const getBookById = async req => {
    handlerGetAuth(req);
    return await $axios.get(process.env.BOOK_URL + `${req.params.id}`);
};
const editBook = async req => {
    return await $axios.put(
        process.env.BOOK_URL + `${req.body.id}`,
        {
            title: req.body.title,
            author: req.body.author,
            ISBN: req.body.ISBN,
            numberOfPages: req.body.numberOfPages,
            price: req.body.price,
            yearPublished: req.body.yearPublished,
        },
        handlerPutAuth(req)
    );
};
const deleteBook = async req => {
    handlerDeleteAuth(req);
    return await $axios.delete(process.env.BOOK_URL + `${req.params.id}`);
};
module.exports = { getBooks, getAllBooksId, postBook, getBookById, editBook, deleteBook };
