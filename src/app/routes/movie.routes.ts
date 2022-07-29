import { Router } from "express";
import { createNewMovie, deleteMovie, getMovieById, showMovies } from "../controllers/movie.controller";
import storage from '../controllers/storage.controller'
const router  = Router();

router.post('/addMovie', storage,createNewMovie); 
router.get('/showMovies', showMovies); 
router.get('/getMovieById', getMovieById); 
router.get('/deleteMovie', deleteMovie); 
 
export default router;
