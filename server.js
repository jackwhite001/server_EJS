const http = require('http');
const app = require('./app/app');
require('dotenv').config();
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`server is successful run on port ${process.env.PORT}!`);
});
