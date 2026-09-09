import carController from "../controller/carController.js";
import orderController from "../controller/orderController.js"
import express from "express";
import multer from "../middleware/multer.js";
import { isLoggedIn ,  isAdmin} from "../middleware/authentication.js";
import paymentController from '../controller/paymentController.js'
const router = express.Router();

router.get("/", carController.getHomePage);
router.get("/moreDetail/:id", isLoggedIn,  carController.moreDetail);
router.get("/addCar", isAdmin , carController.carAddForm);
router.delete("/addCar/delete/:id", isAdmin , carController.deletePost);


router.post("/addCar", multer.single('file'),carController.addCar);
router.post("/search", carController.search);

//Order routes
router.get("/orders/history", isAdmin , orderController.getOrderHistory);
router.get("/orders", isAdmin , orderController.getOrderMessage);
router.put("/order/:id", orderController.acceptOrder);
router.put("/decline/:id", orderController.declineOrder);
//router.post("/orderCar",multer.single('receipt'), orderController.makeOrder);
router.delete("/orders/delete/:id", orderController.deleteOrders);
router.get("/user/order/history",isLoggedIn, orderController.getUserHistory)
//Chapa Routes

router.get("/", paymentController.getOrderButton)
router.get("/api/payment-success", paymentController.getSuccessfulMessage)
router.get("/api/verify-payment/:id", paymentController.verifyTransaction)

router.post("/api/pay", paymentController.makePayment)


export default router; 