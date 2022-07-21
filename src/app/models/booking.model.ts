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
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Show"
    },
    timeStamp: {
        type: Date
    }
});

const Booking = mongoose.model(eModel.Booking, bookingSchema, eModel.Booking);

export default Booking;