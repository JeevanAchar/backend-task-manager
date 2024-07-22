const User = require("../models/userModel.js");
const generateJwtToken = require("../utilities/jwtGenerator.js");
const { encodePassword } = require("../utilities/bcrypt.js");


const Register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const findRegisterUser = await User.findOne({ email });

    if (findRegisterUser) {
        return res.status(400).json({
            statusCode: 400,
            message: "user exist"
        });
    } else {
        const hashedPassword = await encodePassword(password);
        const hashedConfirmPassword = await encodePassword(confirmPassword);
        try {
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                confirmPassword: hashedConfirmPassword
            });
            const token = generateJwtToken(user);
            if (token) {
                return res.status(201).json({
                    statusCode: 201,
                    message: "Success",
                    data: {
                        firstName,
                        email,
                        token
                    }
                })
            }
            else {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Internal Server Error",
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
            })
        }
    }
}

module.exports = {
    Register,
}