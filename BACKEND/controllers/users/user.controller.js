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

//@desc Block user
//@route put /api/v1/users/block/userIdToBlock
//@access private
export const blockUSer = asyncHandler(async(req,res,next)=>
{
  //!find the userid to be blocked
  const userIdToBlock= req.params.userIdToBlock;
  //! Check wheather the user is present in DB or Not
  const userToBlock  = await User.findById(userIdToBlock);
   if(!userToBlock)
   {
  let error = new Error("User to block not Found!");   
  next(error);  
  return;  // humna yaha return kyo diya 
   }
  //!Get the current user id
  const userBlocking = req?.userAuth?._id;
  //! Check if it is not self Blocking
  if(userIdToBlock.toString() === userBlocking.toString()) 
  {
    let error = new Error("Cannot block yourSelf!");   
  next(error);  
  return;  
  }
  //! Get the Current User Object from Db
  const currentUser = await User.findById(userBlocking);

  //! Check Wheather the userIdToBlock is already blocked 
  if(currentUser.blockedUsers.includes(userIdToBlock))
  {
        let error = new Error("This user has already has been blocked!");
        next(error);
        return;  
  }

  //! push the user to be blocked in the blockedUsers array
  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  res.json({
    status: "success",
    message: "User blocked Successfully",
  });
})

//@desc UnBlock user
//@route PUT /api/v1/users/unblock/:userIdToUnBlock
//@access private
export const unBlockUser = asyncHandler(async(req,res,next)=>
{
   //!Find the user to be unblocked
   const userIdToUnBlock = req.params.userIdToUnBlock;
   const userToUnBlock = await User.findById(userIdToUnBlock);
   if(!userToUnBlock)
   {
    let error = new Error("User to unblock not found!");
    next(error)
    return;
   }
   //!find the current user 
   const userUnBlocking = req?.userAuth?._id;
   const currentUser = await User.findById(userUnBlocking);
   
   //! checked if the user to unblock is already blocked 
   if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
     let error = new Error("User not blocked!");
     next(error);
     return;
   }

   //!remove the user from the current user blockedUsers array 
   currentUser.blockedUsers=currentUser.blockedUsers.filter((id)=>{
    return id.toString()!==userIdToUnBlock;
   })
   //! updated the DB
   await currentUser.save();

   //! return the response
     res.json({
       status: "success",
       message: "User Unblocked Successfully",
     });
})

//@desc View  another user profile
//@route GET /api/v1/users/view-other-profile/:userProfileId
//@access private

export const viewOtherProfile = asyncHandler(async(req,res,next)=>
{
  //!  Get the userId whose profile is to be viewed
  const userProfileId = req.params.userProfileId;
  const userProfile = await User.findById(userProfileId);
  if (!userProfile) {
    let error = new Error("User whose profile is to be viewed not present!");
    next(error);
    return;
  }
  const currentUserId = req?.userAuth?._id;
  //!Check if we have already viewed the profile of userProfile
  if (userProfile.profileViewers.includes(currentUserId)) {
    let error = new Error("you have already viewed the profile!");
    next(error);
    return;
  }
  //!push the currentUserId into array of userProfile
  userProfile.profileViewers.push(currentUserId);
  //!update the DB
  await userProfile.save();
  //! return the response
  res.json({
    status: "success",
    message: "Profile Successfully viewed",
  });
})

//@desc Follow User
//@route PUT api/v1/users/following/:userIdTOFollow
//@access private

export const followingUser =asyncHandler(async(req,res,next)=>{
  //! Find the current user id
  const currentUserId = req?.userAuth?._id;

  //! Find the user to be followed 
  const userIdTOFollow = req.params.userIdTOFollow;
  const userProfile = await User.findById(userIdTOFollow);
  if(!userProfile)
  {
    let error = new Error("User to be Followed not present!");
    next(error);
    return;
  }
  //! Avoid current user following himself

  //!push the id to of userToFollow inside following array of current user

  //!Push the current User Id into the followers array of userToFollow 

  //!send the response
})