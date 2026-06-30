const mongoose=require("mongoose");

const ordersSchema=new mongoose.Schema(
    {
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods"
    }],
    payment:{

    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["preparing","prepare","on the way","deliverd"],
        default:"preparing",
    },





},{timestamps:true}
);

//model
const orderModel=mongoose.model("Orders",ordersSchema);

module.exports=orderModel
