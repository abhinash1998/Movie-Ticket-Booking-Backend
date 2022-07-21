import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type:String
    },
    createdAt: {
        type: Date
    }
});

const User = mongoose.model(eModel.User, userSchema, eModel.User);

export default User