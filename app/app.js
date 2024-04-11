const express = require('express');
const cors = require('cors');
const app = express();
let session = require('express-session');
const page = require('../routers/router');
const book = require('../routers/bookRouter');
const author = require('../routers/authorRouter');
require('dotenv').config();
// 返回仅解析 JSON 并且仅查看 Content-Type标头与 type选项匹配的请求的中间件。此解析器接受正文的任何​​ Unicode 编码
app.use(express.json());
// 中间件 express.urlencoded() 可以将客户端以 POST 方式提交的 application/x-www-form-urlencoded数据转换为 JavaScript 对象。
// 注册 express.urlencoded() 中间件以处理客户端
// 以 POST 方式发送的
// application/x-www-form-urlencoded 格式的数据

// use middleware to create express session
app.use(
    session({
        secret: process.env.SECRET,
        resave: true, //是否在每次请求时重新保存session  20 分钟    4:00  4:20
        saveUninitialized: false, //是否为每次请求都设置一个
    })
);
// extended: false 使该中间件不要解析被嵌套的数据
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use('/', page);
app.use('/books', book);
app.use('/authors', author);
app.use((req, res) => {
    req.session.destroy(null);
    res.status(404).render('404');
});
module.exports = app;
