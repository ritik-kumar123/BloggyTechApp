import mongoose from "mongoose"
const  commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Post",
      require:true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment",commentSchema)