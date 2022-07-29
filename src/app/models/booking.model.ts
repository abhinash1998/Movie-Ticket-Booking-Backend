import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const bookingSchema = new mongoose.Schema({

    status: {
        type: Number,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    theatreName: {
        type: String,
        required: true
    },
    movieName: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date
    }
});

const Booking = mongoose.model(eModel.Booking, bookingSchema, eModel.Booking);

export default Booking;