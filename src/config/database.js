const mongoose = require("mongoose");
const dotnev = require("dotenv").config();
const mongo_url = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("connected to database");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = connectDb;
