import express from "express";
import { blockUSer, getProfile, login, register, unBlockUser, viewOtherProfile } from "../../controllers/users/user.controller.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
const usersRouter = express.Router();

//!Register Route
usersRouter.post("/register", register);

//!Login Route
usersRouter.post("/login", login);

//!Profile Route
usersRouter.get("/profile",isLoggedIn,getProfile);

//!Block User Route
usersRouter.put("/block/:userIdBlock",isLoggedIn,blockUSer);
//!unBlock User Route
usersRouter.put("/unblock/:userIdToUnBlock", isLoggedIn, unBlockUser);
//!View another profile user Route 
usersRouter.get("/view-other-profile/:userProfileId", isLoggedIn, viewOtherProfile);






export default usersRouter ;