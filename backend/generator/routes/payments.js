const paymentRouter = require('express').Router()
const axios = require('axios')
const Payment = require('../models/payment')

paymentRouter.post('/initiate', async (req,res) => {
    const { amount, mpesaNumber, email, deliveryPoint } = req.body

    try {
        const paymentResponse = await axios.post('https://mpesa-api.com/pay', {
            amount,
            mpesaNumber
        })

        const transactionId = paymentResponse.data.transactionId

        const newPayment = new Payment({
            mpesaNumber,
            amount,
            email,
            deliveryPoint,
            transactionId
        })

        await newPayment.save()
        res.status(200).json({status: 'Success', transactionId})
    } catch(error) {
        console.error(error)
        res.status(500).json({msg: 'Error in initiating payment'})
    }
})

paymentRouter.get('/confirm', async (req, res) => {
    const {transactionId } = req.query

    try {
        const confirmationResponse = await axios.get(`https://mpesa-api.com/confirm/${transactionId}`)

        if (confirmationResponse.data.status === 'confirmed') {
            await Payment.findOneAndUpdate(
            { transactionId },
            { status: 'confirmed' }
            );
            return res.status(200).json({ status: 'confirmed' });
            }
            res.status(400).json({ status: 'pending' })
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ error: 'Payment confirmation failed' });
        }
})

module.exports = paymentRouter