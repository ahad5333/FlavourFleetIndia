import express from "express"
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeOrder, userOrders, verfyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verfy", verfyOrder)
orderRouter.post("/userorders", authMiddleware,userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status",verfyOrder)





export default orderRouter