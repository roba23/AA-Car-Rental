import carController from "../controller/carController.js";
<<<<<<< HEAD
=======
import orderController from "../controller/orderController.js"
>>>>>>> e5d9f9a (i added a new order controller file to you)
import express from "express";
import multer from "../middleware/multer.js";
const router = express.Router();

router.get("/", carController.getHomePage);
<<<<<<< HEAD
router.post("/addCar", multer.single('file'),carController.addCar);
router.get("/moreDetail/:id", carController.moreDetail);
router.get("/admin", carController.adminPage);
router.post("/orderCar",multer.single('receipt'), carController.orderCar);
=======
router.get("/moreDetail/:id", carController.moreDetail);
router.get("/admin", carController.adminPage);
router.get('/orders', orderController.getOrderMessage)


router.post("/addCar", multer.single('file'),carController.addCar);
router.post('/postCars/order', multer.single('receipt'), orderController.makeOrder)

router.put('/order/:id', orderController.acceptOrder)

>>>>>>> e5d9f9a (i added a new order controller file to you)
export default router;