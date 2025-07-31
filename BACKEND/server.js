import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { globalErrorHandler, notFound } from "./middlewares/globalErrorHandler.js";
import usersRouter from "./routes/users/usersRouter.js";
import CategoriesRouter from "./routes/categories/categoriesRouter.js";
import postsRouter from "./routes/posts/postsRouter.js";
import CommentsRouter from "./routes/comments/commentsRouter.js";
//! Create an express app
const app = express();

//! load the environment variable
dotenv.config();

//! Establish connection to mongoDB
connectDB(); 

//! setup the middleware
app.use(express.json());

//! Setup the User Router
app.use("/api/v1/users",usersRouter)
//! Setup the Category Router
app.use("/api/v1/categories",CategoriesRouter)
//! Setup the Post Router
app.use("/api/v1/posts",postsRouter)
//! Setup the Comments Router
app.use("/api/v1/comments",CommentsRouter)

//! Not Found Error Handler
app.use(notFound)

//! Setup the global error
app.use(globalErrorHandler)


const PORT =process.env.PORT|| 4000;

app.listen(PORT,()=>
{
    console.log(`Server Started at ${PORT}`);
})
