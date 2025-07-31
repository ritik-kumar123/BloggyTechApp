export const globalErrorHandler = (error, req, res, next) => 
{
  const status = error?.status ? error.status : "failed";
  const message = error?.message;
  const stack = error?.stack;
  res.status(500).json({ status, message, stack });
};

export const notFound =(req,res,next)=>{
    let error = new Error(`Cannot find the route for ${req.originalUrl} at the server`)
    next(error);
}