import errorLogBLL from "../bll/error-log.bll";
import Cinema from "../models/cinema.model";

export default class cinemaBLL {
    async createNewCinema(cinemaObject) {
        try {
            const { cinemaName, totalCinemaHalls, cinemaLocation, cityName } = cinemaObject;

            const cinema = new Cinema({
                cinemaName,
                totalCinemaHalls,
                cinemaLocation,
                cityName,
                createdAt: new Date()
            });

            const result = await cinema.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('cinemaBLL', 'createNewCinema', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async showCinema() {
        try {
            const result = await Cinema.find();

            const distinctCinemaName = await Cinema.distinct("cinemaName");

            const cinemaResult = distinctCinemaName.map(cinema => ({ option: cinema, value: cinema }))
            return {
                status: true,
                data: { result: result, cinemaResult: cinemaResult }
            };
        } catch (error) {
            await new errorLogBLL().logError('cinemaBLL', 'showCinema', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getCinemaNameByCity(cinemaObject) {
        try {

            const result = await Cinema.find({ cityName: cinemaObject.cityName }).distinct("cinemaName");

            const cinemaResult = result.map(cinema => ({ option: cinema, value: cinema }));
            return {
                status: true,
                result: cinemaResult
            };
        } catch (error) {
            await new errorLogBLL().logError('cinemaBLL', 'getCinemaNameByCity', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

}  