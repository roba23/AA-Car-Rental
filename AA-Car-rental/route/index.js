import express from "express";
import carRoutes from "./carRoutes.js"; 


const router = express.Router();

router.use("", carRoutes);






export default router;