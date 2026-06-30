const bcrypt=require("bcryptjs");
const express=require("express");
const JWT=require("jsonwebtoken");
const userModel = require("../Models/userModel");
const app=express();

app.use(express.json());



//REGISTER

const registerController=async (req,res)=>{
    try {
        const{userName,email,password,phone,address,answer}=req.body

        //Validation
        if (!userName||!email||!password||!phone||!address||!answer) {
            return res.status(400).send({
                success:false,
                message:"please provide all fields"
            });
            
        }

        const existing=await userModel.findOne({email})
        if (existing) {
            return res.status(409).send({
                success:false,
                message:"user already exists please login"

            });
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //CREATE NEW USER
        const user=await userModel.create({
            userName,
            email,
            password:hashedPassword,
            address,
            phone,
            answer
        });
        return res.status(201).send({
            success:true,
            message:"successfully registered",
            user
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in register API",
            error
        });
        
        
    }

}


//LOGIN
const loginController=async (req,res)=>{
    try {
        const {email,password}=req.body

        //validation
        if (!email||!password){
            return res.status(500).send({
                success:false,
                message:"please provide email and password"
            });
            
        }
        
        //check user registered or not
        const user=await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                success:false,
                message:"user not found"
            });
        }

        //compair password

       const isMatch= await bcrypt.compare(password,user.password);
       if (!isMatch) {
        return res.status(500).send({
            success:false,
            message:"Invalid Credentials"
        });
        
       }
       console.log("password match:",isMatch);
       

       //token
       const token=JWT.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
       )
        res.status(200).send({
            success:true,
            message:"user login sucessfully",
            token,
            user,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login API",
            error
        });
        
        
    }

}



module.exports={registerController,loginController}
