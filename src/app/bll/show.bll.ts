import errorLogBLL from "../bll/error-log.bll";
import Movie from "../models/movie.model";
import Show from "../models/show.model";
import Theatre from "../models/theatre.model";

export default class showBLL {
    async createNewShow(showObject) {
        try {
            const { createdOn,startTime,endTime, theatreName,title } = showObject;

            const movieResult = await Movie.findOne({$and:[
                { title: title },
                {activeStatus:1}]});
            
            const cinemaHallResult = await Theatre.findOne({$and:[
                    { theatreName: theatreName },
                    {movies: movieResult._id}]});

            const show = new Show({
                createdOn,
                startTime,
                endTime,
                createdAt: new Date()
            });
          show.movies = movieResult._id;
          show.theatres = cinemaHallResult._id;

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
            // console.log(theatreObject.movieId)
            const result = await Show.find({$and:[
                { createdOn: showObject.showDate },
                {movies: showObject.movieId}]}).populate("theatres");

                // const unique = [...new Set(result.map(item => item.theatres.theatreName))];
                // let s1=[];
                
                // unique.forEach(e=>{
                //     let s = result.filter(res=>res.theatres.theatreName === e).map(item=> item.startTime);
                //     s1.push(
                //         {cinemaHall:e,
                //         startDate:s}
                //     )
                // });    

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

            const result = await Show.find({movies:showObject.movieId}).distinct("createdOn");

            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'getShowDatesByMovieId', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}   
