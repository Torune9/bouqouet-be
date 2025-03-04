const { signIn, signUp } = require("../../controller/user/authController");
const deleteProfileImage = require("../../controller/user/deleteProfileImage");
const getProfile = require("../../controller/user/getProfile");
const createOrUpdateProfile = require("../../controller/user/profileController");
const { uploadImageProfile } = require("../../services/middleware/uploadFile");
const {validateLogin,validateRegister, validateProfile} = require("../../services/middleware/validator");

const userRouter = require("express").Router();

userRouter.post("/login",validateLogin, signIn);

userRouter.post("/register",validateRegister,signUp);

userRouter.get("/profile/:id",getProfile);

userRouter.put("/profile/:id",uploadImageProfile,validateProfile,createOrUpdateProfile)

userRouter.delete("/profile/:id",deleteProfileImage)

module.exports = userRouter;
