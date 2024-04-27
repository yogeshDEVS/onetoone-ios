const express = require('express')
const app = express()

const stripe = require('stripe')('sk_test_51OqamVSB1jj7UmQHhfNhooW9lgLwclXdVy2y2wuyqxbqIsWf5Iqn4vF6HCRshviIlcJHo5ZjcabfT7Y4S39UTgYC00VhHW7AMr');



app.get('/', function(req, res){
    res.send('Hello World')
})

app.post('/create-payment-intent', async(req, res) =>{
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: 1099,
            currency: 'usd',
          });

          res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(505).send(JSON.stringify(error))
    }
})

app.listen(4002, () => console.log('Api is running'))
