const bookingRouter = require('express').Router()
const Booking = require('../models/booking')
const User = require('../models/user')

bookingRouter.get('/', async (req,res) => {
    const bookings = await Booking.find({})

    res.json(bookings)
})

module.exports = bookingRouter