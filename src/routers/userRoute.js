const { Register, Login } = require("../controller/userController");
const route = require("express").Router();

route.post("/user/register", Register);

route.post("/user/login", Login);

module.exports = route;
