import jwt from "jsonwebtoken"

export const generateToken = (user)=>
{
   const payload ={
    user:{
        id:user._id,
    },
   }
   const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
   return token;
}