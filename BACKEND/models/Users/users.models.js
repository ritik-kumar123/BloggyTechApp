import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  lastlogin: {
    type: Date,
    default: Date.now(),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  accountLevel: {
    type: String,
    enum: ["bronze", "silver", "gold"],
    default: "bronze",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverImage: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  notificationType: {
    email: {
      type: String,
      // required: true,
    }, 
  },
  gender: {
    type: String,
    enum: ["male", "female", "prefer not to say", "non-binary"],
    // required: true,
  },

  //! this properties deals with relationship
  profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

  passwordResetToken:
  {
    type:String,
  },
  passwordResetExpires:
  {
    type:Date,
  },
  accountVerificationToken:
  {
        type:String,
  },
  accountVerificationExpires:
  {
     type:Date
  },

},
{
    timestamps:true
}
);

export const User = mongoose.model("User",userSchema)