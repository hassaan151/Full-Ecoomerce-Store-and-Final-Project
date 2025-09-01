import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  deleteOrder,   // ✅ NEW CONTROLLER IMPORT
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// 🔹 Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.post('/delete', adminAuth, deleteOrder); // ✅ ADMIN CAN DELETE ORDERS

// 🔹 Payment + Order Placement (✅ User Auth)
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// 🔹 User Orders (✅ User Auth)
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
