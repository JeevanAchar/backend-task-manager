const bcrypt = require("bcrypt");

const encodePassword = async (password) => {
    try {
        // generate salt
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // encode the password
        const encodedPassword = await bcrypt.hash(password, salt);
        return encodedPassword;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const decodePassword = async (password) => {
    try {
        // decode password
        const decodedPassword = await bcrypt.compare(password);
        return decodedPassword;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    encodePassword,
    decodePassword
}
