import { Router } from "express";
import { createBooking, getBookingByUserId, getBookingDetailsById, getBookings, getLatestBookingByUserId } from "../controllers/booking.controller";
const router  = Router();

router.post('/createBooking',createBooking); 
router.get('/getBookings', getBookings); 
router.get('/getBookingDetailsById', getBookingDetailsById); 
router.get('/getBookingByUserId', getBookingByUserId); 
router.get('/getLatestBookingByUserId', getLatestBookingByUserId); 

export default router;
