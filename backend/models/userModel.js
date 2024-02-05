const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Pleasen enter an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter an valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your new password"],
      minLength: [6, "Password should be at least 6 characters long"],
      maxLength: [23, "Password should be within 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please upload your photo."],
      default: "https://iconduck.com/icons/9971/user-avatar",
    },
    phone: {
      type: String,
      default: "+880",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio should be within 250 characters"],
      default: "Bio",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
