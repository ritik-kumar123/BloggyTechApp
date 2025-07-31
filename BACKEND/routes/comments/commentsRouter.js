import express from "express";
const CommentsRouter = express.Router();
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import { createComment } from "../../controllers/comments/comments.controller.js";

//! Create Comment Route
CommentsRouter.post("/:postId", isLoggedIn, createComment);

export default CommentsRouter;
