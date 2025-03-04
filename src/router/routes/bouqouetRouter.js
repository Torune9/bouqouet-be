const express = require("express");


const {validateBouqouet} = require("../../services/middleware/validator");
const { uploadImageProduct } = require("../../services/middleware/uploadFile");

const bouqouetRouter = express.Router();

const addBouqouet = require("../../controller/product/addBouquet");
const getAllBouqouet = require("../../controller/product/getAllBouqouet");
const updateBouqouet = require("../../controller/product/updateBouqouet");
const deleteBouqouet = require("../../controller/product/deleteBouqouet");
const getDetailBouqouet = require("../../controller/product/detailBouqouet");


bouqouetRouter.get("/",getAllBouqouet);

bouqouetRouter.get("/:id",getDetailBouqouet);

bouqouetRouter.post("/",uploadImageProduct,validateBouqouet,addBouqouet);

bouqouetRouter.put("/:id",uploadImageProduct,updateBouqouet);

bouqouetRouter.delete("/:id",deleteBouqouet);

module.exports = bouqouetRouter;
