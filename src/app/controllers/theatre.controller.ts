import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import theatreBLL from "../bll/theatre.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createNewTheatre = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
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

export const showTheatresByMovieId = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.movieId) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new theatreBLL().showTheatresByMovieId(req.query);
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

