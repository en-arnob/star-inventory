const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
