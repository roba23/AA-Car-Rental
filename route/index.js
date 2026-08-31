import express from "express";
import carRoutes from "./carRoutes.js"; 
import userRoutes from "./userRoutes.js";


const router = express.Router();

router.use("", carRoutes);
router.use("/user", userRoutes);





export default router;