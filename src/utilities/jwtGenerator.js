const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secret = process.env.SECRET;

const generateJwtToken = (user) => {
    try {
        // JWT payload containing user information
        const payload = {
            userId: user._id,
            userName: user.firstName,
            userEmail: user.email
        }

        // Specifies token expiration
        const options = {
            expiresIn: '1h',
        };

        // Generate and return token
        const token = jwt.sign(payload, secret, options);
        return token;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

module.exports = generateJwtToken;
