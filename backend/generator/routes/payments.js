const paymentRouter = require('express').Router()
const axios = require('axios')
const Payment = require('../models/payment')

// Get all payments
paymentRouter.get('/', async (req, res) => {
    try {
      const payments = await Payment.find();
      res.json(payments);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update payment status
  paymentRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!['Pending', 'Confirmed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
  
    try {
      const payment = await Payment.findById(id);
  
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      payment.status = status;
      await payment.save();
      res.json(payment);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Create a new payment (optional, for testing purposes)
  paymentRouter.post('/new', async (req, res) => {
    const { id, mpesaNumber, amount, email, deliveryPoint, transactionId, status } = req.body;
  
    try {
      const newPayment = new Payment({ id, mpesaNumber, amount, email, deliveryPoint, transactionId, status });
      await newPayment.save();
      res.status(201).json(newPayment);
    } catch (err) {
      res.status(400).json({ message: 'Error creating payment' });
    }
  });

  
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