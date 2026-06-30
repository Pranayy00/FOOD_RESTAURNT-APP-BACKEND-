const dotenv=require("dotenv");
const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const { connectDb } = require("./db");

const app=express();

//configure .env 
dotenv.config();

//CALL DB
connectDb();



//PORT
const PORT=process.env.PORT

//middlewares
app.use(express.json());
app.use(cors()); // cors allows communication between two ports
app.use(morgan("dev"));  //dev tells us which url has been hit and what is status of that url


//Register  Routes
app.use("/api/v1/auth",require("./Routes/authRoutes"));

//Login Routes
app.use("/api/v2/auth",require("./Routes/authRoutes"));

//user Routes
app.use("/api/v1/user",require("./Routes/authUsers"));

//update user
app.use("/api/v1/user",require("./Routes/authUsers"));

//reset password
app.use("/api/v1/user",require("./Routes/authUsers"));

//update password
app.use("/api/v1/user",require("./Routes/authUsers"));

//DELETE -USER 
app.use("/api/v1/user",require("./Routes/authUsers"));

//CREATE-RESTAURANT
app.use("/api/v1/restaurant",require("./Routes/restaurantRoutes"));

//CREATE - CATEGORY
app.use("/api/v1/category",require("./Routes/categoryRoutes"));

//CREATE-FOOD
app.use("/api/v1/food",require("./Routes/foodRoutes"));

// //UPDATE-FOOD
// app.use("/api/v1/updateFood/",require("./Routes/foodRoutes"));

//DELETE-FOOD
//app.use("/api/v1/deletFood",)

app.listen(PORT,()=>{
console.log("PORT=",process.env.PORT,"running..");

});
