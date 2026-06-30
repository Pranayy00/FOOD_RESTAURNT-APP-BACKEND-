const express=require("express");
const { getUserController, updateUser, resetPasswordController, updatePasswordController, deleteProfileController } = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router=express.Router();

//GET USER||GET
router.get("/getUser", authMiddleware ,getUserController);


//UPDATE USER||PUT
router.put("/updateUser",authMiddleware,updateUser);

//RESET PASSWORD
router.post("/resetPassword",authMiddleware,resetPasswordController);

//UPDATE USER PASSWORD
router.post("/updatePassword",authMiddleware,updatePasswordController);


//DELTE USER PASSWORD
router.delete("/deleteUser", authMiddleware,deleteProfileController);





module.exports=router;
