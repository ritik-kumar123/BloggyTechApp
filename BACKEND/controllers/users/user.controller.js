import { User } from "../../models/Users/users.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import asyncHandler from "express-async-handler"

//@desc Register new user
//@route POST /api/v1/users/register
//@access public
export const register = asyncHandler(async (req, res,next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User Already Exist");
    }
    const newUser = new User({ username, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.json({
      status: "success",
      message: "User registered successfully",
      _id: newUser?.id,
      username: newUser?.username,
      email: newUser?.email,
      role: newUser?.role,
    });
})

//@desc Login new user
//@route POST /api/v1/users/login
//@access public
export const login = asyncHandler(async (req, res,next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
     throw new Error("Invalied user and password");
    }
    const isMatched = await bcrypt.compare(password, user?.password);
    if (!isMatched) {
      throw new Error("Invalied user and password");
    }
    user.lastlogin = new Date();
    await user.save();
    return res.json({
      status: "success",
      message: "Successfully Login",
      email: user?.email,
      _id: user?._id,
      username: user?.username,
      role: user?.role,
      token: generateToken(user),
    });
})
//@desc Profile view
//@route GET /api/v1/users/profile/:id
//@access private
export const getProfile = asyncHandler(async (req, res,next) => {
    const user = await User.findById(req.userAuth.id);
    res.json({
       status: "success", 
       message: "Profile fetched",
        user,
       });
  })
