
const foodModel = require("../Models/foodModel");
const orderModel = require("../Models/orderModel");
const userModel = require("../Models/userModel");
const createFoodController=async (req,res)=>{
    try {
        const{title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating,ratingCount}=req.body
        if (!title||!description||!price||!restaurant) {
            return res.status(400).send({
                success:false,
                message:"Please Provide All the fields"
            });
            
        }
       const newFood =new foodModel({title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating,ratingCount});
          await newFood.save()
          res.status(201).send({
            success:true,
            message:"New Food Created",
            newFood

          });

        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error In Get Food API",
            error:error.message
        });
        
    }

}

//GET ALL FOOD
const getAllFoodsController=async (req,res)=>{
    try {
        const foods=await foodModel.find({});
        if (foods.length===0) {
            return res.status(404).send({
                success:false,
                message:"Food Not Found"
            });
            
        }
        res.status(200).send({
            success:true,
            totalFood:foods.length,
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In get Food API",
            error:error.message
        });
        
        
    }

}


//GET SINGLE FOOD 
const getSingleFoodController=async(req,res)=>{
    try {
           const foodId=req.params.id;
           if (!foodId) {
            return res.status(404).send({
                success:false,
                message:"Please Provide Food Id"
            });
            
           }
           const food=foodModel.findById(foodId)
           if (!food) {
            return res.status(404).send({
                success:false,
                message:"No Food Foound Matching This Id"
            });
            
           }
           res.status(201).send({
            sucess:true,
            message:"Match Found",
            food
           });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In get Single Food API",
            error:error.message
        });
        
        
    }

}

//GET FOOD BY RESTAURANT
const getFoodByRestaurantController=async(req,res)=>{

    try {
        const restaurantId=req.params.id
        if (!restaurantId) {
            return res.status(404).send({
                success:false,
                message:"Please Provide Id"
            });
            
        }
        const food=await foodModel.findById(restaurantId);
        if (!food) {
            return res.status(404).send({
                success:false,
                message:"food not found with this id"
            });
            
        }
        res.status(201).send({
            success:true,
            message:"Food  Found",
            food
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In get Food By Restaurant API",
            error:error.message
        });
        
        
    }
    
}

//UPDATE FOOD BY ID
const updateFoodController=async (req,res)=>{
    try {
    const foodId=req.params.id
        if (!foodId) {
            return res.status(404).send({
                success:false,
                message:"please provide food id"
            });
            
        }
    const food =await foodModel.findById(foodId)
      if (!food) {
        return res.status(404).send({
            success:false,
            message:"Food Not Foound"
        });
        
      }
    const{title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating,ratingCount}=req.body
    const updatedFood=await foodModel.findByIdAndUpdate(foodId,{title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating,ratingCount},{new:true});
    res.status(201).send({
        success:true,
        message:"food item updated",
        updatedFood
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error Update Food API"
        });
        
        
    }
}

//DELETE-FOOD
const deleteFoodController=async (req,res)=>{
    try {
          const foodId=req.params.id
          if (!foodId) {
            return res.status(404).send({
                success:false,
                message:"Please provide id"
            });
            
          }
          const food=await foodModel.findById(foodId);
          if (!food) {
            return res.status(404).send({
                success:false,
                message:"No food Found with matching id"
            });

            
          }
          await foodModel.findByIdAndDelete(foodId);
          res.status(201).send({
            success:true,
            message:"Food item deleted",
            food
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In  Delete Food API",
            error:error.message
        });
        
        
    }

}

//PLACE - ORDER
const placeOrderController=async(req,res)=>{
    try {
        const{cart}=req.body
        if (!cart) {
            return res.status(500).send({
                sucess:false,
                message:"Food cart required"
            });
            
        }
        let total=0
        //calculate
        cart.map((i)=>{
            total+=i.price

        });

       const newOrder =new foodModel({
            foods:cart,
            payment:total,
            buyer:req.user.id
        });
        res.status(201).send({
            success:true,
            message:"Order placed successfully",
            newOrder
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error In Order API",
            error:error.message
        });
        
        
    }

}

//CHANGE OREDER STATUS
const orderStatusController=async(req,res)=>{
    try {
        const oredrId=req.params.id
        if (!orderId) {
            return res.status(404).send({
                success:false,
                message:"Please Provide Oreder id"
            });
            
        }
        const{status}=req.body
        const order=await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In oredr API Status",
            error:error.message
        });
        
        
    }
}

module.exports={createFoodController,getAllFoodsController,getSingleFoodController,getFoodByRestaurantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController}