import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const cinemaHallSchema = new mongoose.Schema({

    cinemaHallName: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cinema"
    },
    createdAt: {
        type: Date
    }
});

const CinemaHall = mongoose.model(eModel.CinemaHall, cinemaHallSchema, eModel.CinemaHall);

export default CinemaHall;