//const JWT=require("jsonwebtoken");
const userModel=require("../Models/userModel");

module.exports=async(req,res,next)=>{
    try {
   
        const user=userModel.findById(req.body.id);  
        if (user.usertype!=="admin") {
            return res.status(404).send({
                success:false,
                message:"Admin access only"
            });
            
        } else {
            next();
            
        }


    } catch (error) {
        console.log(error);
         return res.status(500).send({
            success:false,
            message:"un-authorized access"
        });
    
        
    }
}