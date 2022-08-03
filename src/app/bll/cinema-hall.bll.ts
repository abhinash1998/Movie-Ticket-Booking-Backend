import errorLogBLL from "../bll/error-log.bll";
import CinemaHall from "../models/cinema-hall.model";
import Cinema from "../models/cinema.model";

export default class cinemaHallBLL {
    async createNewCinemaHall(cinemaHallObject) {
        try {
            const { cinemaHallName, totalSeats, cinemaName } = cinemaHallObject;

            const cinemaHallResult = await Cinema.findOne(
                { cinemaName: cinemaName });


            const cinemaHall = new CinemaHall({
                cinemaHallName,
                totalSeats,
                createdAt: new Date()
            });

            cinemaHall.cinemaId = cinemaHallResult._id;

            const result = await cinemaHall.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('cinemaHallBLL', 'createNewCinemaHall', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
    
    async showCinemaHall() {
        try {
            const result = await CinemaHall.find().populate("cinemaId");
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('cinemaHallBLL', 'showCinemaHall', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getCinemaHallByCinemaName(cinemaHallObject) {
        try {
            const result = await Cinema.findOne({cinemaName: cinemaHallObject.cinemaName})

            const ditinctCinemaHall = await CinemaHall.find({cinemaId: result._id}).distinct("cinemaHallName");

            const cinemaHallResult = ditinctCinemaHall.map(cinemaHall=>({option: cinemaHall, value: cinemaHall}));
            return {
                status: true,
                result: cinemaHallResult
            };
        } catch (error) {
            await new errorLogBLL().logError('cinemaHallBLL', 'getCinemaHallByCinemaName', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

}  