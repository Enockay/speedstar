const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    mpesaNumber: { type: String, required: true },
    deliveryPoint: { type: String, required: true },
    cartItems: [{
    mealId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
   })

cartSchema.set('toJSON', {
    transform : (document, returnedData) => {
        returnedData.id = returnedData._id.toString()

        delete returnedData._id
        delete returnedData.__v
    }
})


module.exports = mongoose.model('Cart', cartSchema)