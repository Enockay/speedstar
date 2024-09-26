const mongoose = require('mongoose')
const mealSchema = require('./menu').schema

const hotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    logo : String,
    meals : [mealSchema]
})

hotelSchema.set('toJSON', {
    transform : (document, returnedData) => {
        returnedData.id = returnedData._id.toString()

        delete returnedData._id
        delete returnedData.__v
    }
})

module.exports = mongoose.model('Hotel', hotelSchema)