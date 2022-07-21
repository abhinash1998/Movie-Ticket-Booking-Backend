import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const citySchema = new mongoose.Schema({

    cityName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    movieId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Movie"
    },
    createdAt: {
        type: Date
    }
});

const City = mongoose.model(eModel.City, citySchema, eModel.City);

export default City;