import { Router } from "express";
import { createPayment, getPaymentById } from "../controllers/payment.controller";
const router  = Router();

router.post('/createPayment',createPayment); 
router.get('/getPaymentById', getPaymentById); 

export default router;
