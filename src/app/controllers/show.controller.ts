import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import showBLL from "../bll/show.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createNewShow = async (req: Request, res: Response) => {
    try {

        const result = await new showBLL().createNewShow(req.body);
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

export const showCinemaHallsByMovieIdAndShowDate = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.movieId || !req.query.showDate
            || !req.query.cityName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new showBLL().showCinemaHallsByMovieIdAndShowDate(req.query);
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

export const getShowDatesByMovieId = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.movieId || !req.query.cityName) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new showBLL().getShowDatesByMovieId(req.query);
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

export const getAllShows = async (req: Request, res: Response) => {
    try {
        const result = await new showBLL().getAllShows();
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