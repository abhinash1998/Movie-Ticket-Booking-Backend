import { Router } from "express";
import { createNewMovie, deleteMovie, showMovies } from "../controllers/movie.controller";
import storage from '../controllers/storage.controller'
const router  = Router();

router.post('/addMovie', storage,createNewMovie); 
router.get('/showMovies', showMovies); 
router.get('/deleteMovie', deleteMovie); 
 
export default router;
