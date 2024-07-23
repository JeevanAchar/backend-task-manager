const erroHandler = (err, req, res, next) => {
    const statusCode = err.statuCode || 500;
    console.error(err.stack);
    res.status(statusCode).json({
        statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};

module.exports = erroHandler;
