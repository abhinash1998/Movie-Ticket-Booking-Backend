import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const showSchema = new mongoose.Schema({

    showDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cinema"
    },
    cinemaHallId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Cinema-Hall"
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Movie"
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "City"
    },
    createdAt: {
        type: Date
    }
});

const Show = mongoose.model(eModel.Show, showSchema, eModel.Show);

export default Show;