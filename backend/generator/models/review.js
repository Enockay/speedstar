const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
   });


ReviewSchema.set('toJSON', {
    transform : (document, returnedData) => {
        returnedData.id = returnedData._id.toString()

        delete returnedData._id
        delete returnedData.__v
    }
})

module.exports = mongoose.model('Review', ReviewSchema)
