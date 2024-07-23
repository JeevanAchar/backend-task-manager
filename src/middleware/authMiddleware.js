const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'No token, authorization denied'
        })
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Token is not valid'
        })
    }
}

module.exports = authMiddleware;
