import { Post } from "../../models/Posts/post.models.js";
import { User } from "../../models/Users/users.models.js";
import { Category } from "../../models/Categories/categoryies.model.js";
import asyncHandler from "express-async-handler";

//@desc Create a new post
//@route POST /api/v1/posts
//@access private
export const createPost = asyncHandler(async (req, res, next) => {
  //Get the Payload
  const { title, content, categoryId } = req.body;

  //Check if the post is present
  const postFound = await Post.findOne({ title });
  if (postFound) {
    let error = new Error("Post Already Existing");
    next(error);
    return;
  }
  //Create post object
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
  });

  //Update category by adding post in it
  const user = await User.findByIdAndUpdate(
    req?.userAuth?._id,
    { $push: { posts: post._id } },
    { new: true }
  );

  //Update user by adding post in it
  const category = await Category.findByIdAndUpdate(
    categoryId,
    { $push: { posts: post._id } },
    { new: true }
  );

  //send the response
  res.json({
    status: "success",
    message: "Post successfully created",
    post,
    user,
    category,
  });
});

//@desc Get All Posts
//@route GET /api/v1/posts
//@access public
export const getAllPosts = asyncHandler(async (req, res) => {
  // fetch all  the job from the database
  const allposts = await Post.find({});
  // send the response
  res.status(201).json({
    status: "Success",
    message: "All posts Succesfully fetched",
    allposts,
  });
});

//@desc Get Single post
//@route Get /api/v1/post/:id
//@access public
export const getPost = asyncHandler(async (req, res) => {
  // get id
  const postid = req.params.id;
  // fetch the post corresponding to this id
  const post = await Post.findbyId(postid);
  if (post) {
    res.json({
      status: "success",
      message: "single post succesffully fetch",
      post,
    });
  } else {
    res.json({
      status: "success",
      message: "No post available for given id",
    });
  }
});

//@desc Delete post
//@route Delete /api/v1/post/:id
//@access private
export const deletePost = asyncHandler(async (req, res) => {
  // get id
  const postid = req.params.id;
  // Delete this post from the DB
  await Post.findbyIdAndDelete(postid);
  res.json({
    status: "success",
    message: " post succesffully deleted",
  });
});

//@desc update post
//@route PUT /api/v1/post/:id
//@access private
export const updatePost = asyncHandler(async (req, res) => {
  // Get the id
  const postid = req.params.id;
  // Get the post object from req
  const post = req.body;
  // Update this post in the DB
  const updatedPost = await Post.findbyIdAndUpdate(postid, post, {
    new: true,
    runValidators: true,
  });
  // send the response
  res.json({
    status: "success",
    message: " post succesffully Updated",
    updatedPost,
  });
});
