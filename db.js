require("dotenv").config();
const mongoose=require("mongoose");


const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log("connected...");
        
        
    }).catch((err) => {
        console.log(err);
        
        
    });
}

connectDb();
module.exports={connectDb};