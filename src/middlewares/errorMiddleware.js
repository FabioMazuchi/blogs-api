const error = (err, req, res, _next) => {
    if (err.isJoi) return res.status(400).json({ message: err.details[0].message });
    if (err.status) return res.status(err.status).json({ message: err.message });
};

module.exports = error;