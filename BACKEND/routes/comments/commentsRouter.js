import express from "express";
const CommentsRouter = express.Router();
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import { createComment, deleteComment, updateComment } from "../../controllers/comments/comments.controller.js";

//! Create Comment Route
CommentsRouter.post("/:postId", isLoggedIn, createComment);

//! Delete Comment Route
CommentsRouter.delete("/:commentId", isLoggedIn, deleteComment);

//! Update Comment Route
CommentsRouter.put("/:commentId", isLoggedIn, updateComment);

export default CommentsRouter;
