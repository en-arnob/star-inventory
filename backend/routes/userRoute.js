module.exports = (app) => {
  const userRouter = require("express").Router();
  const userController = require("../controllers/userController");
  const { protected } = require("../middlewares/authMiddleware");

  userRouter.post("/register", userController.register);
  userRouter.post("/login", userController.login);
  userRouter.get("/logout", userController.logout);
  userRouter.get("/get-user-data", protected, userController.getUserData);
  userRouter.get("/loginstatus", userController.isLoggedIn);
  userRouter.patch("/updateuser", protected, userController.updateUser);
  userRouter.patch("/changepassword", protected, userController.changePassword);

  app.use("/api/user", userRouter);
};
