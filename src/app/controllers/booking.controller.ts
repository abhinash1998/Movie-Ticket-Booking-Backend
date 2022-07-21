import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bookingBLL from "../bll/booking.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createBooking = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new bookingBLL().createBooking(req.body);
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

export const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await new bookingBLL().getBookings();
        if (result.status) {
            return res.status(StatusCodes.OK).send(result);
        }
        else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(result);
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const getBookingByUserId = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.userId) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new bookingBLL().getBookingByUserId(req.query);
        if (result.status) {
            return res.status(StatusCodes.OK).send(result);
        }
        else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(result);
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};