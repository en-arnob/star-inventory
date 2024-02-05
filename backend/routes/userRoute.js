module.exports = (app) => {
  const userRouter = require("express").Router();

  userRouter.get("/register", (req, res) => {
    res.json({ msg: "User Router Working" });
  });

  app.use("/api/user", userRouter);
};
