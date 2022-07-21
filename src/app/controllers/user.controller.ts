import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import eErrorMessage from "../enum/error-message.enum";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from "../models/user.model";

export default class UserController {
    async signupUser(req: Request, res: Response) {

        try {
            let { fullName, email, phoneNumber, password } = req.body;

            if (!(fullName && email && phoneNumber && password)) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    status: 400,
                    message: eErrorMessage.FieldContent
                });
            }
            else {

                const foundUser = await User.findOne({ email: email });

                if (!!foundUser) {
                    res.status(StatusCodes.UNAUTHORIZED).send({ status: 401, message: "Email already exists" });
                }
                else {
                    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY,
                        { expiresIn: 20 });

                    bcrypt.hash(password, 10, (err, hash) => {
                        password = hash

                        const newUser = new User({
                            fullName,
                            email,
                            phoneNumber,
                            password,
                            createdAt: new Date(),
                            token
                        });


                        newUser.save();
                    });
                    res.status(StatusCodes.CREATED).send({ message: "You have successfully registered into the system", token });
                }
            }

        }
        catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: signupAdmin Class: UserController Error : ${error}`);
        }
    }

    async signinUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    status: 400,
                    message: eErrorMessage.FieldContent
                });
            }
            else {

                const foundUser = await User.findOne({ email: email });
                const token = req.headers["authorization"];

                const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

                if (foundUser != null) {
                    bcrypt.compare(password, foundUser.password, (err, result) => {
                        if (result) {
                            res.status(StatusCodes.OK).send({ status: 200, message: "Successfully logged in!!" });
                        }
                        else {
                            res.status(StatusCodes.UNAUTHORIZED).send({ status: 401, message: eErrorMessage.InvalidPassword });
                        }
                    });
                }
                else {
                    res.status(StatusCodes.NOT_FOUND).send({ status: 404, message: eErrorMessage.InvalidEmail });
                }
            }

        }
        catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Method: signinUser Class: UserController Error : ${error}`);
        }
    }

}
