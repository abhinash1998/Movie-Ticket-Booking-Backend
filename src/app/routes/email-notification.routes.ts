import { Router } from "express";
import { sendEmail } from "../controllers/email-notification.controller";

const router  = Router();

router.post('/sendEmail', sendEmail); 
 
export default router;
