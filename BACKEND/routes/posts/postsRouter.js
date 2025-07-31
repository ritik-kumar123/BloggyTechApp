import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../../controllers/posts/posts.controller.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
const postsRouter = express.Router();

//! Create POST route
postsRouter.post("/", isLoggedIn, createPost);

//! Get All POSTS route
postsRouter.get("/", getAllPosts)

//! Get A Single POST route
postsRouter.get('/:id',getPost)

//! Delete POST
postsRouter.delete("/:id",isLoggedIn,deletePost)

//! Update POST
postsRouter.put('/:id',isLoggedIn,updatePost)

export default postsRouter;
