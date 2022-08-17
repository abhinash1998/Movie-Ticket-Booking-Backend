import errorLogBLL from "../bll/error-log.bll";
import City from "../models/city.model";
import Movie from "../models/movie.model";

export default class cityBLL {

    async addCity(cityObject) {
        try {

            const { cityName, state } = cityObject;

            const city = new City({
                cityName,
                state,
                createdAt: new Date()
            });


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
            const result = await City.distinct("cityName");

            const cityResult = result.map(city => ({ option: city, value: city }))
            return {
                status: true,
                result: cityResult
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

            const cityResult = await City.findOne({ cityName: cityObject.cityName });

            const result = await Movie.find({ "cityId": cityResult._id });

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