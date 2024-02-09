const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please fill up the required fields!");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 5 characters long");
  }
  // check if email already registered
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email.");
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // generate jwt
  const token = generateToken(user._id);

  // send http-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, photo, bio } = user;
    res.status(201).json({
      msg: "User created successfully",
      _id,
      name,
      phone,
      email,
      photo,
      bio,
      // token,
    });
  } else {
    res.status(400);
    throw new Error("User Registration Failed");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("Please enter email and password!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }

  // check if password matches
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (passwordIsCorrect) {
    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, photo, bio } = user;
    res.status(201).json({
      msg: "User logged in successfully",
      _id,
      name,
      phone,
      email,
      photo,
      bio,
      // token,
    });
  } else {
    res.status(400);
    throw new Error("Login failed");
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // Expires in current second
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Logged out successfully" });
});
