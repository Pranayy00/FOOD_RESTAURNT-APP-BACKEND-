const express=require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const { categoryController, getAllCategoryController } = require("../Controllers/categoryController");

const router=express.Router();

//POST ROUTE
router.post("/create",authMiddleware,categoryController);

//GET ROUTE
router.get("/getAll",authMiddleware,getAllCategoryController);




module.exports=router