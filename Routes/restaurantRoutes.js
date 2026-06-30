const express=require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const {createRestaurantController,getAllRestaurantController, getRestaurantById, deletRestaurantById} = require("../Controllers/restaurantController");

const router=express.Router();


//CREATE RESTAURANT
router.post("/create",authMiddleware,createRestaurantController);

//GET ALL RESTAURANT||GET
router.get("/getAll",authMiddleware,getAllRestaurantController);

//GET RESTAURANT BY ID
router.post("/getId",getRestaurantById);

//DELETE RESTAURANT BY ID
router.post("/delRestaurant",authMiddleware,deletRestaurantById);



module.exports=router


