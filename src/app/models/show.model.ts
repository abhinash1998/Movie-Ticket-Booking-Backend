import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const showSchema = new mongoose.Schema({

    createdOn: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    theatres: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Theatre"
    },
    movies: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Movie"
    },
    createdAt: {
        type: Date
    }
});

const Show = mongoose.model(eModel.Show, showSchema, eModel.Show);

export default Show;