import errorLogBLL from "../bll/error-log.bll";
import Booking from "../models/booking.model";

export default class bookingBLL {
    async createBooking(bookingObject) {
        try {
            const { status, numberOfSeats, seats, amount, customerId, theatreName, movieName } = bookingObject;

            const booking = new Booking({
                status,
                numberOfSeats,
                seats,
                amount,
                customerId,
                theatreName,
                movieName,
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
            const result = await Booking.find().populate("customerId");

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

            const result = await Booking.find({ customerId: bookingObject.userId });

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
