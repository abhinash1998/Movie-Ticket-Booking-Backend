import errorLogBLL from "../bll/error-log.bll";
import * as nodemailer from 'nodemailer';
import Booking from "../models/booking.model";
import User from "../models/user.model";

export default class emailNotificationBLL {

    async sendEmail(emailObject) {
        try {

            let transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            const admin = await User.findOne({ role: "admin" });

            const bookingResult = await Booking.findOne({ customerId: emailObject.emailBody.customerId })
                .sort({ _id: -1 });

            let showDate = new Date(emailObject.emailBody.showDate).toLocaleDateString('en-us',
                { weekday: "short", month: "long", day: "numeric" });

            let startTime = new Date(emailObject.emailBody.startTime).toLocaleString('en-us',
                { timeStyle: "short" });

            let message = {
                from: `${admin.email}`,
                to: `${emailObject.emailId}`,
                subject: "Ticket Details",
                html: `Hi! Your Book My Show movie ticket details for ${emailObject.emailBody.movieName} 
            are: ${showDate}, ${startTime} at ${emailObject.emailBody.cinemaName}, 
            ${emailObject.emailBody.cinemaHallName}.Seats: ${emailObject.emailBody.seats}. 
            Amount: ₹ ${emailObject.emailBody.amount}.Booking ID: ${bookingResult._id}`
            }

            transport.sendMail(message, (err, info) => {
                if (err) {
                    return {
                        status: true,
                        result: err
                    };
                } else {
                    return {
                        status: true,
                        result: info
                    };
                }
            });

        } catch (error) {
            await new errorLogBLL().logError('emailNotificationBLL', 'sendEmail', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}         