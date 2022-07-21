import { Router } from "express";
import { createNewTheatre, showTheatresByMovieId } from "../controllers/theatre.controller";

const router  = Router();

router.post('/createNewTheatre',createNewTheatre); 
router.get('/showTheatreByMovieId',showTheatresByMovieId);  


export default router;
