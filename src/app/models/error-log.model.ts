
import mongoose = require('mongoose');
import eModel from '../enum/model.enum';

const ErrorLogSchema = new mongoose.Schema({
    class_name: String,
    method_name: String,
    error: String,
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const ErrorLog = mongoose.model(eModel.ErrorLog, ErrorLogSchema,eModel.ErrorLog);


export default ErrorLog;