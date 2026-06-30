const categoryModel = require("../Models/categoryModel");

const categoryController=async  (req,res)=>{
    try {
        const{title,imageUrl}=req.body
        if (!title) {
            return res.status(400).send({
                success:false,
                message:"Please Provide title "

            });
            
        }
        const newCategory=new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"new Category Created",
            newCategory
        });


    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            success:false,
            message:"Error In Category API"
        });
        
    }

}

//GET ALL CATEGORY 
const getAllCategoryController=async (req,res)=>{
    try {
        const categories=await categoryModel.find({});
        if (categories.length===0) {
            return res.status(404).send({
                success:false,
                message:"Categories not found"
            });
            
        }
        console.log(categories);
        
        res.status(201).send({
            success:true,
            totalCat:categories.length,
            categories
        });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            mesage:"Error In Get All Category API",
            error
        });
        
    }
}


module.exports={categoryController,getAllCategoryController}