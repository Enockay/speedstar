const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String,
    deliveryFee : {
        type: Number,
        required: true
    }
})

menuSchema.set('toJSON', {
    transform : (document, returnedData) => {
        returnedData.id = returnedData._id.toString()

        delete returnedData._id
        delete returnedData.__v
    }
})

module.exports = mongoose.model('Meal', menuSchema)