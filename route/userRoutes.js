import express from "express";
import userController from "../controller/userController.js";


const  router = express.Router();

router.post("/login", userController.postLogin);
router.get("/login", userController.getLogin);
router.get("/register", userController.getRegister);
router.post("/register", userController.postRegister);
router.get("/logout", userController.logout)

export default router;