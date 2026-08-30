import carController from "../controller/carController.js";
import express from "express";
import multer from "../middleware/multer.js";
import {isloggedin, isAdmin} from "../middleware/authentication.js";
const router = express.Router();

router.get("/", isloggedin, carController.getHomePage);
router.post("/addCar", multer.single('file'),carController.addCar);
router.get("/moreDetail/:id", carController.moreDetail);
router.get("/admin", isloggedin, isAdmin, carController.adminPage);
router.post("/orderCar",multer.single('receipt'), carController.orderCar);
router.post("/search", carController.search);
export default router;