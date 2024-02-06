const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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

  res.json({ name: name });
});
