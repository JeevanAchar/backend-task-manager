const { Register } = require("../controller/userController");
const route = require("express").Router();

route.post("/user", Register);

module.exports = route;
