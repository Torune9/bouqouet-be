const { signIn, signUp } = require("../../controller/user/authController");
const deleteProfileImage = require("../../controller/user/deleteProfileImage");
const getProfile = require("../../controller/user/getProfile");
const createOrUpdateProfile = require("../../controller/user/profileController");
const authenticate = require("../../services/middleware/authenticate");
const { uploadImageProfile } = require("../../services/middleware/uploadFile");
const {validateLogin,validateRegister, validateProfile} = require("../../services/middleware/validator");

const userRouter = require("express").Router();

userRouter.post("/login",validateLogin, signIn);

userRouter.post("/register",validateRegister,signUp);

userRouter
    .route("/profile/:id")
    .get(authenticate, getProfile)
    .put(authenticate, uploadImageProfile, validateProfile, createOrUpdateProfile)
    .delete(authenticate, deleteProfileImage);


module.exports = userRouter;
