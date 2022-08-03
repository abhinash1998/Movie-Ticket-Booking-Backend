import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cinemaBLL from "../bll/cinema.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createNewCinema = async (req: Request, res: Response) => {
    try {
        
        const result = await new cinemaBLL().createNewCinema(req.body);
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

export const showCinema = async (req: Request, res: Response) => {
    try {
        const result = await new cinemaBLL().showCinema();
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

export const getCinemaNameByCity = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.cityName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new cinemaBLL().getCinemaNameByCity(req.query);
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
