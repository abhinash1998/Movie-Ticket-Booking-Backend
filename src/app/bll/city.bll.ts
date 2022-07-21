import errorLogBLL from "../bll/error-log.bll";
import City from "../models/city.model";
import Movie from "../models/movie.model";

export default class cityBLL {

    async addCity(cityObject) {
        try {

            const { cityName,state,movieName } = cityObject;

            const movieResult = await Movie.findOne({$and:[
                { title: movieName },
                {activeStatus:1}]});

            const city = new City({
                cityName,
                state,
                createdAt: new Date()
            });

            city.movieId = movieResult._id;

            const result = await city.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('cityBLL', 'addCity', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async showAllCities() {
        try {
            const result = await City.find().distinct("cityName");
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('cityBLL', 'showAllCities', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getMoviesByCityName(cityObject) {
        try {
            const result = await City.find({cityName: cityObject.cityName}).populate("movieId");
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('cityBLL', 'getMoviesByCityName', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}