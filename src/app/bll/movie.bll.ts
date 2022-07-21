import errorLogBLL from "../bll/error-log.bll";
import Movie from "../models/movie.model";

export default class movieBLL {

    async createMovie(movieObject,imagePath) {
        try {
            const { title, description, cast, director, releaseDate, trailerLink,
                genre, language, durationInMins, format } = movieObject;

            const movie = new Movie({
                title,
                description,
                cast,
                director,
                releaseDate,
                trailerLink,
                genre,
                language,
                durationInMins,
                format,
                imagePath:imagePath,
                createdAt: new Date()
            });


            const result = await movie.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('movieBLL', 'createMovie', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async showMovies() {
        try {
            const result = await Movie.find({ activeStatus: 1 })
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('movieBLL', 'showMovies', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
    
    async deleteMovie(movieObject) {
        try {
            await Movie.updateMany(
                { "_id": movieObject.movieId },
                {
                    "activeStatus": 0,
                    "deletedAt": Date.now()
                });

            return {
                status: true,
                message: "Movie had been deleted successfully"
            };
        } catch (error) {
            await new errorLogBLL().logError('movieBLL', 'deleteMovie', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}