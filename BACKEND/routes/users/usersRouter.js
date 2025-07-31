import express from "express";
import { getProfile, login, register } from "../../controllers/users/user.controller.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
const usersRouter = express.Router();

//!Register Route
usersRouter.post("/register", register);

//!Login Route
usersRouter.post("/login", login);

//!Profile Route
usersRouter.get("/profile",isLoggedIn,getProfile);




export default usersRouter ;