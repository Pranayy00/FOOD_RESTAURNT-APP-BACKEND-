const mongoose=require("mongoose");


//CREATE SCHEMA
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],

    },
    address:{
        type:Array,

    },
    phone:{
        type:String,
        required:[true,"phone no is required"]
    },
    userType:{
        type:String,
        required:[true,"usertype is required"],
        default:"client",
        enum:["client","admin","vendor","driver"]
    },
    profile:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
    },
    answer:{
        type:String,
        required:[true,"answer is required"],
    }

},
{timestamps:true}
);

//CREATE MODEL
const userModel=mongoose.model("User",userSchema);

module.exports=userModel;