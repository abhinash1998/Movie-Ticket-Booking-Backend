import errorLogBLL from "../bll/error-log.bll";
import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET;
 const stripe = new Stripe('sk_test_51LQVt5SIWQnYJ3odwy3k1glEG8DB5nUK9vpNGVjP7tKeZtatGzOpX9v6n5oWHjUJK6qC98JHaLG8EmOVBJuHovfw00uMtKe4Pz', {
    apiVersion: '2020-08-27',
  });

export default class paymentBLL {
    async createPayment(paymentObject) {
        try {
            console.log(paymentObject)

            const customer =   await stripe.customers
            .create({
              email: paymentObject.email,
            });
            
            const paymentIntent = await stripe.paymentIntents.create({
              amount: paymentObject.amount * 100,
              description: "Cinema Hall Ticket Booking",
              currency: "INR"
            });

                return {
                    status: true,
                    result: paymentIntent
                };
          } 
         
         catch (error) {
            await new errorLogBLL().logError('paymentBLL', 'createPayment', error);
            return {
                status: false,
                error: error.message
            }
        }
    }
}  