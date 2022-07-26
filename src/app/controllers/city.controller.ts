import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cityBLL from "../bll/city.bll";
import eErrorMessage from "../enum/error-message.enum";

export const addCity = async (req: Request, res: Response) => {
    try {
        const result = await new cityBLL().addCity(req.body);
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

export const showAllCities = async (req: Request, res: Response) => {
    try {

        const result = await new cityBLL().showAllCities();
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

export const getMoviesByCityName = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.cityName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new cityBLL().getMoviesByCityName(req.query);
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