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

//@desc Delete Comment
//@route DELETE /api/v1/comment/:commentId
//@access private

export const deleteComment = asyncHandler(async (req, res) => {
  //! Get the comment id to be deleted
  const commentId = req.params.commentId;
  await Comment.findByIdAndDelete(commentId);
  res.status(200).json({
    status: "success",
    message: "Comment successfully deleted!",
  });
});

//@desc Update Comment
//@route PUT /api/v1/comment/:commentId
//@access private

export const updateComment = asyncHandler(async (req, res) => {
  //! Get the comment id to be Updated
  const commentId = req.params.commentId;
  //!Get message
  const message = req.body.message;

  const UpdateComment = await Comment.findByIdAndUpdate(
    commentId, 
    { message },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    message: "Comment successfully Updated!",
    UpdateComment,
  });
});
