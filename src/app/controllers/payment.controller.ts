import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import paymentBLL from "../bll/payment.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createPayment = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new paymentBLL().createPayment(req.body);
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

