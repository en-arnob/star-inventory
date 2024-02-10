module.exports = (app) => {
  const userRouter = require("express").Router();
  const userController = require("../controllers/userController");
  const { protected } = require("../middlewares/authMiddleware");

  userRouter.post("/register", userController.register);
  userRouter.post("/login", userController.login);
  userRouter.get("/logout", userController.logout);
  userRouter.get("/get-user-data", protected, userController.getUserData);
  userRouter.get("/loginstatus", userController.isLoggedIn);

  app.use("/api/user", userRouter);
};
