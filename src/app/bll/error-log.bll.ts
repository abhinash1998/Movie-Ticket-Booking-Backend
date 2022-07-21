import ErrorLog from "../models/error-log.model";

export default class errorLogBLL {

    async logError(methodName:String, className:String, errorMessage:String) {
        try {
            const error = new ErrorLog({
                class_name: className,
                method_name: methodName,
                error: errorMessage
            });
            await error.save();
        } catch (error) {
            throw new Error(`Method : logError, Class : errorLogBLL, Error : ${error.message}`);
        }
    }
}
