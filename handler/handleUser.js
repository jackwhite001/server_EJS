const successTemplate = require('../Template/success');
const errorTemplate = require('../Template/error');
const isEmpty = require('../utils/util');
const { postRegister, postLogin } = require('../services/userServices');
const { validateRegistration, validationLogin } = require('../validation/validation');
const message = require('../utils/messages');

const getHomeHandler = (req, res) => {
    session = req.session;
    return successTemplate(res, 'home', 'Home', null, session);
};
const getRegisterHandler = (req, res) => {
    return successTemplate(res, 'register', 'Register');
};

const getLoginHandler = (req, res) => {
    return successTemplate(res, 'login', 'Login', null);
};
const postRegisterHandler = async (req, res) => {
    try {
        console.log('registering');
        const errors = validateRegistration(req.body);
        if (isEmpty(errors)) {
            const result = await postRegister(req.body);
            if (result.data) {
                return successTemplate(
                    res,
                    'login',
                    'Login',
                    result.data.message,
                    'undefined',
                    result?.data?.user
                );
            } else {
                return errorTemplate(
                    req,
                    res,
                    'register',
                    'Register',
                    err.response.data.error.message,
                    message.failed_register
                );
            }
        } else {
            return errorTemplate(req, res, 'register', 'Register', errors, message.failed_register);
        }
    } catch (e) {
        return errorTemplate(req, res, 'register', 'Register', e.response.data.error.message, e);
    }
};
const postLoginHandler = async (req, res) => {
    try {
        console.log('login successful');
        session = req.session;
        const errors = validationLogin(req.body);
        // console.log(errors);
        if (isEmpty(errors)) {
            const result = await postLogin(req.body);
            if (result.data.logged) {
                session.name = result.data.user.firstName;
                session.logged = result.data.logged;
                session.token = result.data.token;
                return successTemplate(res, 'home', 'Home', result.data.message, session);
            } else {
                return errorTemplate(
                    req,
                    res,
                    'login',
                    'Login',
                    result.response.data.error.message,
                    message.failed_login
                );
            }
        } else {
            return errorTemplate(req, res, 'login', 'Login', errors, message.failed_login);
        }
    } catch (e) {
        return errorTemplate(
            req,
            res,
            'login',
            'Login',
            e.response.data.error.message,
            message.failed_login
        );
    }
};
const getAboutHandler = (req, res) => {
    session = req.session;
    return successTemplate(res, 'about', 'About', null, session);
};
const getLogoutHandler = (req, res) => {
    // req.session.destroy(null);
    // 销毁session
    req.session.destroy(() => {
        return successTemplate(res, 'home', 'Home', null);
    });
};
module.exports = {
    getHomeHandler,
    getLoginHandler,
    postLoginHandler,
    getRegisterHandler,
    postRegisterHandler,
    getAboutHandler,
    getLogoutHandler,
};
