import express from "express";

import { isvalidHostname, isAuth, isAdmin } from "../../middlewares/auth";

import userController from "../../controllers/v1/users-controller";

const router = express.Router();

router.post("/login", userController.login);
router.post("/create", userController.createUser);
router.post("/delete", isAuth, isAdmin, userController.deleteUser);
router.post("/update", isvalidHostname, isAuth, userController.updateUser);
router.get("/get-all", isAuth, isAdmin, userController.getUsers);

export default router;