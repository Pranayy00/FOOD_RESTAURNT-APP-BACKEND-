const express=require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const { getFoodController, createFoodController, getAllFoodsController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../Controllers/foodController");
const adminMiddleware = require("../Middlewares/adminMiddleware");
const router=express.Router();
//CREATE-FOOD||POST
router.post("/create",authMiddleware,createFoodController);

//GET ALL FOOD
router.get("/getAll",getAllFoodsController);

//GET FOOD BY ID
router.get("/get/:id",getAllFoodsController);

//POST FOOD BY RESTAURANT
router.post("/getByRestaurant/:id",getFoodByRestaurantController);

//UPDATE FOOD
router.post("/updateFood/:id",authMiddleware,updateFoodController);

//DELETE-FOOD
router.delete("/deleteFood/:id",authMiddleware,deleteFoodController);

//PLACE-ORDER
router.post("/order",authMiddleware,placeOrderController);

//OREDR-STATUS
router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController);

module.exports=router