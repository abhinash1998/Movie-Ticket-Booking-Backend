import { Router } from "express";
import UserController from "../controllers/user.controller";

const router  = Router();

router.post('/signupUser',new UserController().signupUser ); 
router.post('/loginUser',new UserController().signinUser ); 

export default router;
