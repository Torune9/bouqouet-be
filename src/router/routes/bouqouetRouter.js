const express = require("express");

const upload = require("../../services//middleware/uploadFile");

const {validateBouqouet} = require("../../services/middleware/validator");
const bouqouetRouter = express.Router();

const addBouqouet = require("../../controller/product/addBouquet");
const getAllBouqouet = require("../../controller/product/getAllBouqouet");
const updateBouqouet = require("../../controller/product/updateBouqouet");


bouqouetRouter.get("/",getAllBouqouet);

bouqouetRouter.post("/",upload,validateBouqouet,addBouqouet);

bouqouetRouter.put("/:id",upload,updateBouqouet);

module.exports = bouqouetRouter;
