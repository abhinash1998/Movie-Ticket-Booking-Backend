import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import theatreBLL from "../bll/theatre.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createNewTheatre = async (req: Request, res: Response) => {
    try {
        
        const result = await new theatreBLL().createNewTheatre(req.body);
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

export const getTheatreDetailsByTheatreName = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.theatreName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new theatreBLL().getTheatreDetailsByTheatreName(req.query);
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

export const getTheatreNameByCity = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.cityName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new theatreBLL().getTheatreNameByCity(req.query);
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


export const showTheatres = async (req: Request, res: Response) => {
    try {
        const result = await new theatreBLL().showTheatres();
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

