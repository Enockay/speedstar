const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceType: { type: String, enum: ['movers', 'foodDelivery', 'groceryShopping',
   'parcelDelivery'] },
    details: Object, // contains additional booking details (pickup/drop-off, groceries list, etc.)
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
    price: Number,
    bookedAt: { type: Date, default: Date.now },
    deliveryTime: Date,
   });


BookingSchema.set('toJSON', {
    transform : (document, requestedData) => {
        requestedData.id = requestedData._id.toString()

        delete requestedData._id
        delete requestedData.__id
    }
})

module.exports = mongoose.model('Booking', BookingSchema)