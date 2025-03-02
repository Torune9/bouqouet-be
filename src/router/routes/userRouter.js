
const { signIn, signUp } = require("../../controller/user/authController");
const {validateLogin,validateRegister} = require("../../services/middleware/validator");
const userRouter = require("express").Router();

userRouter.post("/login",validateLogin, signIn);
userRouter.post("/register",validateRegister,signUp);

module.exports = userRouter;
