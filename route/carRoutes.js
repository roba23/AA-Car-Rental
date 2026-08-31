import carController from "../controller/carController.js";
import orderController from "../controller/orderController.js"
import express from "express";
import multer from "../middleware/multer.js";
import {isloggedin, isAdmin} from "../middleware/authentication.js";
const router = express.Router();

router.get("/", carController.getHomePage);
router.get("/moreDetail/:id", carController.moreDetail);
router.get("/addCar", isAdmin , carController.carAddForm);


router.post("/addCar", multer.single('file'),carController.addCar);
router.post("/search", carController.search);


router.get("/orders", isAdmin , orderController.getOrderMessage);
router.put("/order/:id", orderController.acceptOrder);
router.put("/decline/:id", orderController.markAsAvailable);
router.post("/orderCar",multer.single('receipt'), orderController.makeOrder);


export default router; 