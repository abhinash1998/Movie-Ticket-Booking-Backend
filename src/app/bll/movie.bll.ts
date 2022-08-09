import errorLogBLL from "../bll/error-log.bll";
import City from "../models/city.model";
import Movie from "../models/movie.model";

export default class movieBLL {

    async createMovie(movieObject,imagePath) {
        try {
            
            const { title, description, cast, director, releaseDate, trailerLink,
                genre, language, durationInMins,format } = movieObject;

            movieObject.cityName = JSON.parse(movieObject.cityName);
   
                let cityArray=[];

                for (const city of movieObject.cityName) {
                    const cityResult = await City.findOne({cityName: city});
                    
                    cityArray.push(
                       cityResult._id  
                    )
                  }

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
                createdAt: new Date(),
            });

            movie.cityId = cityArray;

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

    async getMovieById(movieObject) {
        try {
            const result = await Movie.findOne({_id:movieObject.movieId})

            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('movieBLL', 'getMovieById', error);
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