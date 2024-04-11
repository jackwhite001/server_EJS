const $axios = require('axios');
require('dotenv').config();

const handlerGetAuth = req => {
    return ($axios.defaults.headers.get['Authorization'] = req.headers.authorization);
};
const handlerPostAuth = req => {
    return ($axios.defaults.headers.post['Authorization'] = req.headers.authorization);
};
const handlerPatchAuth = req => {
    return ($axios.defaults.headers.patch['Authorization'] = req.headers.authorization);
};
const handlerDeleteAuth = req => {
    return ($axios.defaults.headers.delete['Authorization'] = req.headers.authorization);
};
const getAuthors = async req => {
    handlerGetAuth(req);
    return await $axios.get(process.env.AUTHOR_URL);
};
const addAuthor = async req => {
    return await $axios.post(
        process.env.AUTHOR_URL,
        {
            name: req.body.name,
            book: req.body.bookId,
            publisher: req.body.publisher,
            website: req.body.website,
            twitter: req.body.twitter,
            about: req.body.about,
        },
        handlerPostAuth(req)
    );
};
const getAuthorById = async req => {
    handlerGetAuth(req);
    return await $axios.get(process.env.AUTHOR_URL + req.params.id);
};
const updateAuthor = async req => {
    return await $axios.patch(
        process.env.AUTHOR_URL + req.body.id,
        {
            name: req.body.name,
            book: req.body.bookId,
            publisher: req.body.publisher,
            website: req.body.website,
            twitter: req.body.twitter,
            about: req.body.about,
        },
        handlerPatchAuth(req)
    );
};

const deleteAuthor = async req => {
    return await $axios.delete(process.env.AUTHOR_URL + req.params.id, handlerDeleteAuth(req));
};
module.exports = { getAuthors, addAuthor, getAuthorById, updateAuthor, deleteAuthor };
