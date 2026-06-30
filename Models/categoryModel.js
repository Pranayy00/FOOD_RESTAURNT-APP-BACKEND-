const mongoose=require("mongoose");

const categorySchema=new mongoose.Schema({
title:{
    type:String,
    required:[true,"category title is required"]
},
imageUrl:{
    type:String,
    default:"https://i.pinimg.com/474x/59/5f/a5/595fa5ffb3d67f62ceabaa0d9a40d1e2.jpg"
},
},{timestamps:true}
);


//CREATE MODEL
const categoryModel=mongoose.model("Category",categorySchema);

module.exports=categoryModel