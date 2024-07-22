const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secret = process.env.SECRET;

const verifyJwtToken = (token) => {
    try {
        // Verify the JWT using the secret key
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error("JWT verification failed", err.message);
        return null;
    }
}

module.exports = verifyJwtToken;
