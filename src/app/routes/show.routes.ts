import { Router } from "express";
import { addNewShow, getAllShows, getShowDatesByMovieIdAndCityName, showCinemaHallsAndStartTimeByMovieIdAndShowDate } from "../controllers/show.controller";

const router  = Router();

router.post('/addNewShow',addNewShow); 
router.get('/showCinemaHallsAndStartTimeByMovieIdAndShowDate',showCinemaHallsAndStartTimeByMovieIdAndShowDate); 
router.get('/getShowDatesByMovieIdAndCityName',getShowDatesByMovieIdAndCityName); 
router.get('/getAllShows',getAllShows); 

export default router;
