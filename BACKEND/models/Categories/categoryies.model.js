import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Post",
    }],
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category",categorySchema)