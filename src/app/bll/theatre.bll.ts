import errorLogBLL from "../bll/error-log.bll";
import Movie from "../models/movie.model";
import Theatre from "../models/theatre.model";

export default class theatreBLL {
    async createNewTheatre(theatreObject) {
        try {
            const { theatreName, totalSeats,title, theatreLocation } = theatreObject;

            const movieResult = await Movie.findOne({$and:[
                { title: title },
                {activeStatus:1}]});

            const theatre = new Theatre({
                theatreName,
                totalSeats,
                theatreLocation,
                createdAt: new Date()
            });
          theatre.movies = movieResult._id;

            const result = await theatre.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('theatreBLL', 'createNewTheatre', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    
    async showTheatresByMovieId(theatreObject) {
        try {
            // console.log(theatreObject.movieId)
            const result = await Theatre.find({movies:theatreObject.movieId}).populate("movies");
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('theatreBLL', 'showTheatreByMovieId', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

   
}