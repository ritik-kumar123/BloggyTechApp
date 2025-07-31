import express from "express";
const CategoriesRouter = express.Router();
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../controllers/categories/categories.controller.js";
//! Create Categorory Route
CategoriesRouter.post("/", isLoggedIn, createCategory);
//! Fetch All Categorory Route
CategoriesRouter.get("/", getAllCategories);
//!Delete A Category Route
CategoriesRouter.delete("/:id", isLoggedIn, deleteCategory);
//!Update A Category Route
CategoriesRouter.put("/:id", isLoggedIn, updateCategory);

export default CategoriesRouter;
