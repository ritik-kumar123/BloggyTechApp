import { Category } from "../../models/Categories/categoryies.model.js";
import asyncHandler from "express-async-handler";

//@desc Create new category
//@route GET /api/v1/categories
//@access private
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const isCategoryPresent = await Category.find({ name });
  if (isCategoryPresent) {
    throw new Error("Category Already Existing");
  }
  const category = await Category.create({
    name,
    author: req?.userAuth?.id,
  });
  res.json({
    status: "success",
    message: "Category registered successfully",
    category,
  });
});

//@desc Get all categories
//@route GET /api/v1/categories
//@access public
export const getAllCategories = asyncHandler( async(req,res)=>
{
    const allCategories = await Category.find({});
    res.status(201).json
    ({
      status:"Success",
      message:"All Categories Succesfully fetched",
      allCategories
    })
})
//@desc Delete Single categories
//@route DELETE /api/v1/categories/:id
//@access private
export const deleteCategory = asyncHandler(async (req, res) => {
   const catId = req.params.id;
    await Category.findByIdAndDelete(catId)({
      status: "Success",
      message: " Categories succesfully deleted",
    });
});

//@desc Update Single categories
//@route PUT /api/v1/categories/:id
//@access private
export const updateCategory = asyncHandler(async (req, res) => {
   const catId = req.params.id;
   const name = req.body.name;
    const updatedCategory = await Category.findByIdAndUpdate(catId,{name:name},{new:true,runValidators:true})({
      status: "Success",
      message: " Categories succesfully updated",
      updatedCategory
    });

});




