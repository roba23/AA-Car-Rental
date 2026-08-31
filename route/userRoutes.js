import express from "express";
import userController from "../controller/userController.js";
import multer from "../middleware/multer.js";

const  router = express.Router();

router.post("/login", userController.postLogin);
router.get("/login", userController.getLogin);
router.get("/register", userController.getRegister);
router.post("/register",multer.single('profile_pic'), userController.postRegister);
router.get("/logout", userController.logOUt)
export default router;