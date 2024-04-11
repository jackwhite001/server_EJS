const express = require('express');
const authorRouter = express.Router();
const {
    getAuthorHandler,
    getAddAuthorHandler,
    AddAuthorHandler,
    getAuthorByIdHandler,
    editAuthorHandler,
    deleteAuthorHandler,
} = require('../handler/handlerAuthor');

authorRouter.get('/', getAuthorHandler);

authorRouter.get('/addAuthor', getAddAuthorHandler);
authorRouter.post('/addAuthor', AddAuthorHandler);
authorRouter.get('/editAuthor/:id', getAuthorByIdHandler);
authorRouter.post('/editAuthor', editAuthorHandler);
authorRouter.get('/deleteAuthor/:id', deleteAuthorHandler);
module.exports = authorRouter;
