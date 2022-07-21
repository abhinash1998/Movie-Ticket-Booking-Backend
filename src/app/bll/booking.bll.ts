import errorLogBLL from "../bll/error-log.bll";
import Booking from "../models/booking.model";
import Movie from "../models/movie.model";
import Show from "../models/show.model";
import Theatre from "../models/theatre.model";

export default class bookingBLL {
    async createBooking(bookingObject) {
        try {
            const { status,numberOfSeats,userId,showId } = bookingObject;

            const booking = new Booking({
                status,
                numberOfSeats,
                userId,
                showId,
                timeStamp: new Date()
            });

            const result = await booking.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('showBLL', 'createBooking', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getBookings() {
        try {
            const result = await Booking.find(); 

            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('bookingBLL', 'getBookings', error);
            return {
                status: false,
                error: error.message
            }
        }
    }


    async getBookingByUserId(bookingObject) {
        try {

            const result = await Booking.find({userId: bookingObject.userId});

            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('bookingBLL', 'getBookingByUserId', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}   
