import { Router } from "express";
import { createBooking, getBookingByUserId, getBookings } from "../controllers/booking.controller";
const router  = Router();

router.post('/createBooking',createBooking); 
router.get('/getBookings', getBookings); 
router.get('/getBookingByUserId', getBookingByUserId); 

export default router;
