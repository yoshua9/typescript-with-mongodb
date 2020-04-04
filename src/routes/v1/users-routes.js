const express = require("express");
const { isvalidHostname, isAuth, isAdmin } = require("../../middlewares/auth");

const userController = require("../../controllers/v1/users-controller");

const router = express.Router();

router.post("/login", userController.login);
router.post("/create", userController.createUser);
router.post("/delete", isAuth, isAdmin, userController.deleteUser);
router.post("/update", isvalidHostname, isAuth, userController.updateUser);
router.get("/get-all", isAuth, isAdmin, userController.getUsers);

module.exports = router;