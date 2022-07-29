import { Router } from "express";
import UserController from "../controllers/user.controller";

const router  = Router();

router.post('/user/register',new UserController().signupUser ); 
router.post('/user/login',new UserController().signinUser ); 

export default router;
