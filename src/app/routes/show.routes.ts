import { Router } from "express";
import { createNewShow, getAllShows, getShowDatesByMovieId, showCinemaHallsByMovieIdAndShowDate } from "../controllers/show.controller";

const router  = Router();

router.post('/createNewShow',createNewShow); 
router.get('/showCinemaHallsByMovieIdAndShowDate',showCinemaHallsByMovieIdAndShowDate); 
router.get('/getShowDatesByMovieId',getShowDatesByMovieId); 
router.get('/getAllShows',getAllShows); 

export default router;
