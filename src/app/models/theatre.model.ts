import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const theatreSchema = new mongoose.Schema({

    theatreName: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    theatreLocation: {
        type: String,
        required: true
    },
    movies: {type: mongoose.Schema.Types.ObjectId, ref: "Movie"},
    createdAt: {
        type: Date
    }
});

const Theatre = mongoose.model(eModel.Theatre, theatreSchema, eModel.Theatre);

export default Theatre;