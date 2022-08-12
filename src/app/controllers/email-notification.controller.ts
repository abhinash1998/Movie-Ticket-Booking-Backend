import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import emailNotificationBLL from "../bll/email-notification.bll";

export const sendEmail = async (req: Request, res: Response) => {
    try {
        const result = await new emailNotificationBLL().sendEmail(req.body);
        if (result.status) {

            return res.status(StatusCodes.CREATED).send(result);
        }
        else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(result);
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};