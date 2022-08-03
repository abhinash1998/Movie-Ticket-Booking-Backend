import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const cinemaSchema = new mongoose.Schema({

    cinemaName: {
        type: String,
        required: true
    },
    totalCinemaHalls: {
        type: Number,
        required: true
    },
    cinemaLocation: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
});

const Cinema = mongoose.model(eModel.Cinema, cinemaSchema, eModel.Cinema);

export default Cinema;