const error = (err, req, res, _next) => {
    if (err.status) return res.status(err.status).json({ message: err.message });
};

module.exports = error;