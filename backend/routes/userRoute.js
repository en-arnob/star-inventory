module.exports = (app) => {
  const userRouter = require("express").Router();
  const userController = require("../controllers/userController");

  userRouter.post("/register", userController.register);

  app.use("/api/user", userRouter);
};
