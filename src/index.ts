import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import eSuccessMessage from "./app/enum/success-message.enum";
import eErrorMessage from "./app/enum/error-message.enum";
import userRoutes from './app/routes/user.routes';
import movieRoutes from './app/routes/movie.routes';
import theatreRoutes from './app/routes/theatre.routes';
import cityRoutes from './app/routes/city.routes';
import showRoutes from './app/routes/show.routes';
import bookingRoutes from './app/routes/booking.routes';
import paymentRoutes from './app/routes/payment.routes';
import path = require("path");
import * as cors from 'cors'
dotenv.config();

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/', userRoutes);
app.use('/', movieRoutes);
app.use('/', theatreRoutes);
app.use('/', cityRoutes);
app.use('/', showRoutes);
app.use('/', bookingRoutes);
app.use('/', paymentRoutes);
app.use('/images', express.static(path.join('images')));

// Connecting to the database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nqy3i.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log(eSuccessMessage.DbSuccessMessage);
}).catch(err => {
    console.log(eErrorMessage.DbErrorMessage, err);
    process.exit();
});


app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is listening on port ${process.env.NODE_PORT}`)
});