const express = require("express");
const cors = require("cors");
const connectDb = require("./config/database.js");
const dotenv = require("dotenv").config();
const app = express();
const passport = require("passport");
const session = require("express-session");
const PORT = process.env.PORT || 5001;
const secret = process.env.SECRET;
const helmet = require("helmet");

// user route
const userRoute = require("./routers/userRoute.js");
// Task route
const taskRoute = require("./routers/taskRoute.js");
// auth route
const authRoute = require("./routers/authRoute.js");
// Auth middleware
const authMiddleware = require("./middleware/authMiddleware.js");
// Error handler
const errorHandler = require("./middleware/errorHandler.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(limiter);

// Connect to database
connectDb();

// routes
// User Registration
app.use("/api", userRoute);

// Task 
app.use("/api", authMiddleware, taskRoute);

// Auth Rouet
app.use("/auth", authRoute);

app.use(errorHandler);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`port is running on ${PORT}`)
    } else {
        console.error(err);
    }
});
