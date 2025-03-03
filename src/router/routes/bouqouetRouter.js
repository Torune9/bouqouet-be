const express = require("express");


const {validateBouqouet} = require("../../services/middleware/validator");
const bouqouetRouter = express.Router();

const addBouqouet = require("../../controller/product/addBouquet");
const getAllBouqouet = require("../../controller/product/getAllBouqouet");
const updateBouqouet = require("../../controller/product/updateBouqouet");
const { uploadImageProduct } = require("../../services/middleware/uploadFile");


bouqouetRouter.get("/",getAllBouqouet);

bouqouetRouter.post("/",uploadImageProduct,validateBouqouet,addBouqouet);

bouqouetRouter.put("/:id",uploadImageProduct,updateBouqouet);

module.exports = bouqouetRouter;
