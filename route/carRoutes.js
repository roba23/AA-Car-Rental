import carController from "../controller/carController.js";
import express from "express";
import multer from "../middleware/multer.js";
const router = express.Router();

router.get("/", carController.getHomePage);
router.post("/addCar", multer.single('file'),carController.addCar);
router.get("/moreDetail/:id", carController.moreDetail);
router.get("/admin", carController.adminPage);
router.post("/orderCar",multer.single('receipt'), carController.orderCar);
router.post("/search", carController.search);
export default router;