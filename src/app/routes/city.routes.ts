import { Router } from "express";
import { addCity, getMoviesByCityName, showAllCities } from "../controllers/city.controller";
const router  = Router();

router.post('/addCity',addCity); 
router.get('/showAllCities', showAllCities); 
router.get('/getMoviesByCityName', getMoviesByCityName); 

export default router;
