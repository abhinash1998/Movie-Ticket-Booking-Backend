import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import movieBLL from "../bll/movie.bll";
import eErrorMessage from "../enum/error-message.enum";

export const createNewMovie = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.body).length) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const imagePath = 'http://localhost:5000/images/' + req.file.filename;
        const result = await new movieBLL().createMovie(req.body,imagePath);
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

export const showMovies = async (req: Request, res: Response) => {
    try {

        const result = await new movieBLL().showMovies();
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


export const deleteMovie = async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.query).length || !req.query.movieId) {
            return res.status(StatusCodes.BAD_REQUEST).send({
                message: eErrorMessage.FieldContent
            });
        }
        const result = await new movieBLL().deleteMovie(req.query);
        if (result.status) {
            return res.status(StatusCodes.OK).send(result.message);
        }
        else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(result);
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};