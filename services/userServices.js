const $axios = require('axios');
require('dotenv').config();

const postRegister = async body => {
    const res = await $axios.post(process.env.USER_URL + '/register', {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        address: body.address,
    });
    return res;
};
const postLogin = async body => {
    const res = await $axios.post(process.env.USER_URL + '/login', {
        email: body.email,
        password: body.password,
    });
    // console.log(res);
    return res;
};
module.exports = { postRegister, postLogin };
