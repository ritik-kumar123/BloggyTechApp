import jwt from "jsonwebtoken";
import { User } from "../models/Users/users.models.js";
export const isLoggedIn = (req, res, next) => {
  //!fetch token from request
  let token = req.headers.authorization?.split(" ")[1];
  //!verify token
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      const error = new Error({ message: "please Login First" });
      next(error);
    } else {
      const userId = decoded?.user?.id;
      const user = await User.findById(userId).select(
        "username email role _id"
      );
      req.userAuth = user;
      next();
    }
  });

  res.json({});

  next();
};
