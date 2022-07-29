import { Router } from "express";
import { createNewTheatre, getTheatreDetailsByTheatreName, showTheatres } from "../controllers/theatre.controller";

const router  = Router();

router.post('/createNewTheatre',createNewTheatre);  
router.get('/getTheatreDetailsByTheatreName',getTheatreDetailsByTheatreName);
router.get('/showTheatres',showTheatres);  


export default router;
