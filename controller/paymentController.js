import axios from  "axios"
import chapaModel from '../model/chapaModel.js'
import configs  from '../middleware/chapaHeader.js'

export default {

// entry for the front end
    async getOrderButton (req, res) {
            res.render("carDetail")
    },

// initial payment endpoint
    async makePayment (req, res) {
        try{
             // chapa redirect you to this url when payment is successful
            const CALLBACK_URL = "http://localhost:3000/api/verify-payment/"
            const RETURN_URL = "http://localhost:3000/api/payment-success/"

            // a unique reference given to every transaction
            const TEXT_REF = "tx-myecommerce12345-" + Date.now()

            const { first_name, last_name, email, phone, amount, dropOff, pickUp, carId } = req.body

            // form data
            const data = await chapaModel.create( {
                amount: amount, 
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                pickUp: pickUp,
                dropOff: dropOff,
                carId: carId,
                userId: req.user.id,
                tx_ref: TEXT_REF,
                callback_url: CALLBACK_URL + TEXT_REF,
                return_url: RETURN_URL + "?tx_ref=" + TEXT_REF,
            } )

            // post request to chapa
            const response = await axios.post(process.env.CHAPA_URL, data, configs)
                return  res.redirect(response.data.data.checkout_url)

        } catch(err) {
                console.error("Payment initiation error:", err.response?.data || err.message)
                return res.status(500).send("Payment failed to initialize.")
        }
    },  

// verification endpoint
    verifyTransaction: async (req, res) => {
    
            //verify the transaction 
            await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, configs)
                .then((response) => {
                    console.log("Payment was successfully verified")
                }) 
                .catch((err) => console.log("Payment can't be verified", err))
    },

    async getSuccessfulMessage (req, res) {
        try {
        // Check for both tx_ref and chapa's default trx_ref parameter
            const tx_ref  = req.query.tx_ref ||req.query.trx_ref

            if (!tx_ref) {
            return res.status(400).send("Transaction reference missing.");
            }

        // 1. Fetch official transaction details from Chapa || verify transaction with chapa
            const response = await axios.get( `https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
                headers: {
                Authorization: ` Bearer ${process.env.CHAPA_SECRET_KEY} `
                }
            } );

            const receiptData = response.data.data;

        // 2. Pass complete receipt data to your EJS template
            return res.render("success", { receipt: receiptData });

        } catch (err) {
            console.error("Error fetching receipt:", err.response?.data || err.message);
            return res.status(500).send("Failed to retrieve payment receipt.");
        }
    }

}