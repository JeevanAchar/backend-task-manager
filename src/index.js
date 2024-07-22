const express = require("express");
const cors = require("cors");
const connectDb = require("./config/database.js");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5001;

// user route
const userRoute = require("./routers/userRoute.js");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDb();

// routes
app.use("/api", userRoute);
app.use("/", (req, res) => {
    try {
        res.status(200).json({
            statuscode: 200,
            message: "Success",
            data: {
                message: "base API is working"
            }
        })
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`port is running on ${PORT}`)
    } else {
        console.error(err);
    }
});
