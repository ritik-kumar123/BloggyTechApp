import asyncHandler from "express-async-handler";
import { Post } from "../../models/Posts/post.models.js";
import { Comment } from "../../models/Comments/comments.models.js";

//@desc Cratre a New Comment
//@route POST /api/v1/comments/:postId
//@access private

export const createComment = asyncHandler(async (req, res) => {
  //Get the Payload
  const { message } = req.body;

  // Get the post id
  const postId = req.params.postId;

  //Create the comment
  const comment = await Comment.create({
    message,
    author: req?.userAuth?._id,
    postId,
  });
  //Associate comment with post
  await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment._id },
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Comment successfully created!",
    comment,
  });
});
