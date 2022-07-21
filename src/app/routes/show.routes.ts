import { Router } from "express";
import { createNewShow, getShowDatesByMovieId, showCinemaHallsByMovieIdAndShowDate } from "../controllers/show.controller";

const router  = Router();

router.post('/createNewShow',createNewShow); 
router.get('/showCinemaHallsByMovieIdAndShowDate',showCinemaHallsByMovieIdAndShowDate); 
router.get('/getShowDatesByMovieId',getShowDatesByMovieId); 

export default router;
