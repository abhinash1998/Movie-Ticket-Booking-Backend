import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cinemaHallBLL from "../bll/cinema-hall.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createNewCinemaHall = async (req: Request, res: Response) => {
    try {
        
        const result = await new cinemaHallBLL().createNewCinemaHall(req.body);
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

export const showCinemaHall = async (req: Request, res: Response) => {
    try {
        const result = await new cinemaHallBLL().showCinemaHall();
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

export const getCinemaHallByCinemaName = async (req: Request, res: Response) => {
    try {

        if (!Object.keys(req.query).length || !req.query.cinemaName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }

        const result = await new cinemaHallBLL().getCinemaHallByCinemaName(req.query);
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