import { Router } from "express";
import { createNewCinema, getCinemaNameByCity, showCinema } from "../controllers/cinema.controller";

const router  = Router();

router.post('/createNewCinema',createNewCinema); 
router.get('/showCinema',showCinema); 
router.get('/getCinemaNameByCity',getCinemaNameByCity); 

export default router;
