const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    mpesaNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    deliveryPoint: { type: String, required: true },
    transactionId: { type: String, required: true },
    status: { type: String ,default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
   });

paymentSchema.set('toJSON', {
    transform : (document, returnedData) => {
        returnedData.id = returnedData._id.toString()

        delete returnedData._id
        delete returnedData.__v
    }
})

module.exports = mongoose.model('Payment', paymentSchema)