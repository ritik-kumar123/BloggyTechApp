import mongoose from "mongoose";

export const connectDB= async()=>
{
    try
    {
     await mongoose.connect(process.env.MONGO_URL);
     console.log("connected succesfully");
    }
    catch
    {
        console.log("Connection to mongodb failed:",error.message);
    }
};