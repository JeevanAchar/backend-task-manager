const User = require("../models/userModel.js");
const generateJwtToken = require("../utilities/jwtGenerator.js");
const { encodePassword, decodePassword } = require("../utilities/bcrypt.js");


const Register = async (req, res, next) => {
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
                        id: user._id,
                        firstName,
                        email,
                        token
                    }
                })
            }
            else {
                const error = new Error("Internal Server Error");
                console.error("unable to register user");
                error.statusCode = 500;
                throw error;
            }
        } catch (err) {
            next(err);
        }
    }
}

const Login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await decodePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                statusCode: 401,
                message: "Invalid email or password"
            });
        }

        const token = generateJwtToken(user);

        return res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: {
                id: user._id,
                email: user.email,
                token
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    Register,
    Login
}