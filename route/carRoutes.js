import carController from "../controller/carController.js";
import orderController from "../controller/orderController.js"
import express from "express";
import multer from "../middleware/multer.js";
import {isloggedin, isAdmin} from "../middleware/authentication.js";
const router = express.Router();

router.get("/", carController.getHomePage);
router.post("/addCar", multer.single('file'),carController.addCar);
router.get("/moreDetail/:id", carController.moreDetail);
router.get("/addCar", isAdmin, carController.carAddForm);
router.post("/orderCar",multer.single('receipt'), orderController.makeOrder);
router.post("/search", carController.search);
router.get("/orders",isAdmin, orderController.getOrderMessage);
router.post("/order/:id", orderController.acceptOrder);
export default router;