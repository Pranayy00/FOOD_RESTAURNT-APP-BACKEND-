const restaurantModel = require("../Models/restaurantModel");
const userModel = require("../Models/userModel");

const createRestaurantController=async (req,res)=>{

    try {
        const{title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body
        if (!title||!coords) {
            return res.status(404).send({
                success:false,
                message:"Please Provide Title And Co-ords"
            });
            
        }
        const newRestaurant=new restaurantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords});
         await newRestaurant.save()
         res.status(200).send({
            success:true,
            message:"New Restaurant Created sucessfully"
         });
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in create Restaurant API",
            error

        });
        
        
    }
}


const getAllRestaurantController=async (req,res)=>{
    try {
       const restaurants=await restaurantModel.find({});
       if (restaurants.length===0) {
        return res.status(404).send({
            success:false,
            message:"Restaurant not Found"
        });
       }

       res.status(200).send({
        success:true,
        totalCount:restaurants.length,
        restaurants
       });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Get Restaurant API"

        });
        
        
    }

}

const getRestaurantById=async (req,res)=>{
    try {
        const{_id}=req.body
        const restaurantId=await restaurantModel.findById(_id);
        if (!restaurantId) {
            return res.status(404).send({
                success:false,
                message:"Cannot Find Restaurant By Id"
            });
            
        }
        res.status(200).send({
            success:true,
            message:"Restaurant found",
            restaurant:restaurantId

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Get Restaurant By Id API"
        });
        
        
    }

}


//DELETE RESTAURANT BY ID
// const deletRestaurantById=async (req,res)=>{
//     try {
//        const{_id}=req.body
//        console.log(_id);
       
//         const delRestaurant=await restaurantModel.findByIdAndDelete(_id);
//         if (!delRestaurant) {
//             return res.status(404).send({
//                 success:false,
//                 message:"Unable to Delete"
//             });
            
//         }
//         res.status(200).send({
//             success:true,
//             message:"Restaurant deleted SuccessFully"
//         });
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error In Delete Restaurant API"

//         });
        
        
//     }

// }




const deletRestaurantById = async (req, res) => {
    try {
        const { _id } = req.body;
        const restaurant = await restaurantModel.findById(_id);
        const delRestaurant = await restaurantModel.findByIdAndDelete(_id);

        if (!delRestaurant) {
            return res.status(404).send({
                success: false,
                message: "Unable to Delete"
            });
        }

        res.status(200).send({
            success: true,
            message: "Restaurant deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Delete Restaurant API"
        });
    }
};

module.exports={createRestaurantController,getAllRestaurantController,getRestaurantById,deletRestaurantById}