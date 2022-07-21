import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const paymentSchema = new mongoose.Schema({

    timesTamp: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Booking"
    }
});

const Payment = mongoose.model(eModel.Payment, paymentSchema, eModel.Payment);

export default Payment;