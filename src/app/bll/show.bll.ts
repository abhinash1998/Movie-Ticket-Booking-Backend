import errorLogBLL from "../bll/error-log.bll";
import CinemaHall from "../models/cinema-hall.model";
import Cinema from "../models/cinema.model";
import City from "../models/city.model";
import Movie from "../models/movie.model";
import Show from "../models/show.model";

export default class showBLL {
    async addNewShow(showObject) {
        try {
            const { showDate, startTime, endTime, cinemaName, cinemaHallName, movieName, cityName } = showObject;

            const movieResult = await Movie.findOne({
                $and: [
                    { title: movieName },
                    { activeStatus: 1 }]
            });

            const cinemaResult = await Cinema.findOne(
                { cinemaName: cinemaName });

            const cinemaHallResult = await CinemaHall.findOne({
                $and: [
                    { cinemaHallName: cinemaHallName },
                    { cinemaId: cinemaResult._id }]
            });;

            const cityResult = await City.findOne(
                { cityName: cityName })

            let difference = new Date(endTime).getTime() - new Date(startTime).getTime();
            let resultInMinutes = Math.round(difference / 60000);

            if (new Date(showDate) < new Date(movieResult.releaseDate)) {
                return {
                    status: false,
                    message: "Show date can't be less than Release Date. Please add proper Show date!!"
                }
            }
            else if (resultInMinutes < movieResult.durationInMins) {
                return {
                    status: false,
                    message: "End Time can't be less than Movie Duration. Please add proper End Time!!"
                }
            }
            else {
                console.log(startTime.toString().split('T')[1].substring(0, 5));
                const foundShow = await Show.find({
                    $and: [
                        { showDate: showDate },
                        { cinemaId: cinemaResult._id },
                        { cinemaHallId: cinemaHallResult._id },
                        { cityId: cityResult._id },
                        { startTime: { $lt: startTime } },
                        { endTime: { $lt: endTime } },
                    ]
                });
                //    console.log(foundShow)
                const show = new Show({
                    showDate,
                    startTime,
                    endTime,
                    createdAt: new Date()
                });

                show.movieId = movieResult._id;
                show.cinemaId = cinemaResult._id;
                show.cinemaHallId = cinemaHallResult._id;
                show.cityId = cityResult._id;

                const result = await show.save();
                return {
                    status: true,
                    result: result
                };
            }

        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'addNewShow', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async showCinemaHallsAndStartTimeByMovieIdAndShowDate(showObject) {
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
                    { movieId: showObject.movieId }, { showDate: showObject.showDate }, { cityId: cityResult._id }]
            }).populate("cinemaId cinemaHallId");


            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('showsBLL', 'showCinemaHallsAndStartTimeByMovieIdAndShowDate', error);
            return {
                status: false,
                error: error.message
            }
        }
    }


    async getShowDatesByMovieIdAndCityName(showObject) {
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
                $and:
                    [
                        { movies: showObject.movieId },
                        { cityId: cityResult._id },
                        { showDate: { $gte: new Date() } }
                    ]
            }).distinct("showDate");

            if (result.length == 0) {
                return {
                    status: false,
                    message: "We couldn't find any shows for this movie"
                }
            }
            else {
                const showResult = result.map(show => ({ option: show, value: show }));

                return {
                    status: true,
                    result: showResult
                };
            }

        } catch (error) {
            await new errorLogBLL().logError('showsBLL', 'getShowDatesByMovieIdAndCityName', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getAllShows() {
        try {
            const result = await Show.find({ showDate: { $gte: new Date() } }).sort('showDate').populate("cinemaId cinemaHallId movieId cityId");
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
