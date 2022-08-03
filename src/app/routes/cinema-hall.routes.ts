import { Router } from "express";
import { createNewCinemaHall, getCinemaHallByCinemaName, showCinemaHall } from "../controllers/cinema-hall.controller";

const router  = Router();

router.post('/createNewCinemaHall',createNewCinemaHall); 
router.get('/showCinemaHall',showCinemaHall); 
router.get('/getCinemaHallByCinemaName',getCinemaHallByCinemaName); 

export default router;
