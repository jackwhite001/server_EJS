const errorTemplate = (req, res, pageName, title, error, message) => {
    res.render(pageName, {
        title: title,
        body: req.body,
        error: error,
        message: message,
    });
};

module.exports = errorTemplate;
