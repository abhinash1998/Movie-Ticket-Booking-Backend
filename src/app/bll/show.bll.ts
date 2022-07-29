import errorLogBLL from "../bll/error-log.bll";
import City from "../models/city.model";
import Movie from "../models/movie.model";
import Show from "../models/show.model";
import Theatre from "../models/theatre.model";

export default class showBLL {
    async createNewShow(showObject) {
        try {
            const { showDate, startTime, endTime, theatreName, movieName, cityName } = showObject;

            const movieResult = await Movie.findOne({
                $and: [
                    { title: movieName },
                    { activeStatus: 1 }]
            });

            const cinemaHallResult = await Theatre.findOne(
                { theatreName: theatreName });

            const cityResult = await City.findOne(
                {
                    $and: [
                        { cityName: cityName },
                        { movieId: movieResult._id }
                    ]
                });

            const show = new Show({
                showDate,
                startTime,
                endTime,
                createdAt: new Date()
            });
            show.movies = movieResult._id;
            show.theatres = cinemaHallResult._id;
            show.cityId = cityResult._id;

            const result = await show.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'createNewShow', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async showCinemaHallsByMovieIdAndShowDate(showObject) {
        try {

            const cityResult = await City.findOne(
                {
                    $and:
                        [
                            { movieId: showObject.movieId },
                            { cityName: showObject.cityName }
                        ]
                }
            )

            const result = await Show.find({
                $and: [
                    { movies: showObject.movieId }, { showDate: showObject.showDate }, { cityId: cityResult._id }]
            }).populate("theatres");

            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'showCinemaHallsByMovieIdAndShowDate', error);
            return {
                status: false,
                error: error.message
            }
        }
    }


    async getShowDatesByMovieId(showObject) {
        try {

            const cityResult = await City.findOne(
                {
                    $and:
                        [
                            { movieId: showObject.movieId },
                            { cityName: showObject.cityName }
                        ]
                }
            );

            const result = await Show.find({
                $and:
                    [
                        { movies: showObject.movieId },
                        { cityId: cityResult._id },
                        { showDate: { $gte: new Date() } }
                    ]
            }).distinct("showDate");

            const showResult = result.map(show => ({ option: show, value: show }));

            return {
                status: true,
                result: showResult
            };
        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'getShowDatesByMovieId', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getAllShows() {
        try {
            const result = await Show.find().populate("theatres movies cityId");
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'getAllShows', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}   
