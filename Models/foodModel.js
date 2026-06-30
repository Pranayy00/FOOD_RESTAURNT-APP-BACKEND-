const mongoose=require("mongoose");

const foodSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"food title is required"]
    },
    description:{
        type:String, 
        required:[true,"food description is mandatory"]
    },
    price:{
        type:Number,
        required:[true,"food price is require"]
    },
    imageUrl:{
        type:String,
        default:"https://i.pinimg.com/474x/59/5f/a5/595fa5ffb3d67f62ceabaa0d9a40d1e2.jpg"

    },
    foodTags:{
        type:String,

    },
    category:{
        type:String,

    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String,
    }


},{timestamps:true}
);

//MODEL
const foodModel=mongoose.model("foods",foodSchema);

//EXPORT 
module.exports=foodModel