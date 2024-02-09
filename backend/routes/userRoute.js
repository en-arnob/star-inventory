module.exports = (app) => {
  const userRouter = require("express").Router();
  const userController = require("../controllers/userController");

  userRouter.post("/register", userController.register);
  userRouter.post("/login", userController.login);
  userRouter.get("/logout", userController.logout);

  app.use("/api/user", userRouter);
};
