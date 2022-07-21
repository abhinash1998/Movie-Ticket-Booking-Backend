import errorLogBLL from "../bll/error-log.bll";
import Booking from "../models/booking.model";
import Payment from "../models/payment.model";

export default class paymentBLL {
    async createPayment(paymentObject) {
        try {
            const { amount,bookingId } = paymentObject;

            const payment = new Payment({
                amount,
                bookingId,
                timeStamp: new Date()
            });

            const result = await payment.save();
            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('paymentBLL', 'createPayment', error);
            return {
                status: false,
                error: error.message
            }
        }
    }

    async getPaymentById(paymentObject) {
        try {

            const result = await Payment.findById(paymentObject.paymentId);

            return {
                status: true,
                result: result
            };
        } catch (error) {
            await new errorLogBLL().logError('paymentBLL', 'getPaymentById', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}   
