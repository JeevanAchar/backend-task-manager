const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    confirmPassword: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
