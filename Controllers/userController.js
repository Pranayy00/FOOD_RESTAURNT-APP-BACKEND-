const userModel = require("../Models/userModel");
const bcrypt=require("bcryptjs");

const getUserController=async (req,res)=>{
    try {
        const user= await userModel.findById(req.user.id).select("-_id");
        if (!user) {
            res.status(500).send({
                success:false,
                message:"User Not Found"

            });
            
        }

        //hide password
        user.password=undefined
        //resp
        return res.status(200).send({
            success:true,
            message:"User get Successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error In Get User API",
            error
        });
        
        
    }

}


const updateUser=async (req,res)=>{
    try {
        //find user
        const user= await userModel.findById(req.user.id)
        //validate user
        if (!user) {
            return res.status(404).send({
                success:false,
                message:"User Not Found"
            });
            
        }
        //update user
        const{userName,address,phone}=req.body
        if (userName) {
            user.userName=userName;
        }
        if (address) {
            user.address=address;
            
        }
        if (phone) {
            user.phone=phone;
            
        }

        //save changes
        await user.save()
        res.status(200).send({
            success:true,
            message:"user update successfully"
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update-User API"
        });
        
        
    }

}
//RESET PASSWORD

const resetPasswordController=async (req,res)=>{
    try {
        const{email,newPassword,answer}=req.body
        //validation
        if (!email||!newPassword||!answer) {
        return res.status(500).send({
            success:false,
            message:"Please Provide All Fields"
        });
            
        }
        //find user
        const user=await userModel.findOne({email,answer})
        if (!user) {
            return res.status(500).send({
                success:false,
                message:"User Not Found Or Invalid Answer"


            });
            
        }
         
        //hash-password
        const hashPassword=await bcrypt.hash(newPassword,10)
        user.password=hashPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        });



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Reset Password API",
            error
        });
        
        
    }

}

//update user password
const updatePasswordController=async (req,res)=>{
    try {
        //find user by id
        const user=await userModel.findById(req.user.id)
        //validate user
        if (!user) {
            return res.status(404).send({
                success:false,
                message:"User Not Found"
            });
        }
        //update user
        const {oldPassword,newPassword}=req.body
        if (!oldPassword||!newPassword) {
            return res.status(500).send({
                success:false,
                message:"Please Provide old or new Password"
            });
            
        }
        //check user password
        // console.log("old password",oldPassword);
        // console.log("new password",newPassword);
        
        // console.log("stored hash:",user.password);
        
        
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if (!isMatch) {
            return res.status(500).send({
                success:false,
                message:"Invalid Old Password"

            });
            
        }

        //console.log("password match:",isMatch);
        //Create Hash Password

        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:"Password Updated Successfully"
        });
        
    


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            messsage:"Error In Update-Password API"

        });
        
        
    }
}

//DELETE USER ACCOUNT

const deleteProfileController=async (req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.user.id);
        res.status(200).send({
            success:true,
            message:"User Profile Deleted SucessFully"

        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete-User API",
            error
        });
        
        
    }

}





module.exports={getUserController,updateUser,resetPasswordController,updatePasswordController,deleteProfileController};