import errorLogBLL from "../bll/error-log.bll";
import Movie from "../models/movie.model";
import Theatre from "../models/theatre.model";

export default class theatreBLL {
    async createNewTheatre(theatreObject) {
        try {
            const { theatreName, totalSeats, theatreLocation, cityName } = theatreObject;

            const theatre = new Theatre({
                theatreName,
                totalSeats,
                theatreLocation,
                cityName,
                createdAt: new Date()
            });

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

    
    async getTheatreDetailsByTheatreName(theatreObject) {
        try {
            // console.log(theatreObject.movieId)
            const result = await Theatre.findOne({theatreName: theatreObject.theatreName});
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('theatreBLL', 'getTheatreDetailsByTheatreName', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getTheatreNameByCity(theatreObject) {
        try {

            const result = await Theatre.find({cityName: theatreObject.cityName}).distinct("theatreName");

            const theatreResult = result.map(theatre=>({option: theatre, value: theatre}));
            return {
                status: true,
                result: theatreResult
            };
        } catch (error) {
            await new errorLogBLL().logError('theatreBLL', 'getTheatreNameByCity', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async showTheatres() {
        try {
            const result = await Theatre.find();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('theatreBLL', 'showTheatres', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

   
}