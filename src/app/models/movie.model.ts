import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cast: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    trailerLink: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    durationInMins: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    activeStatus:{
        default:1,
        type: Number,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date

    },
     deletedAt: {
        type: Date
    }
});

const Movie = mongoose.model(eModel.Movie, movieSchema, eModel.Movie);

export default Movie;