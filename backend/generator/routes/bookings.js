const bookingRouter = require('express').Router()
const Booking = require('../models/booking')
const User = require('../models/user')
const Partner = require('../models/partner')
const middlewares = require('../utils/middlewares')
const configs = require('../utils/configs')

bookingRouter.get('/:id', async (req,res) => {
    const booking = await Booking.findById(req.params.id)

    if(!booking) {
        return res.status(404).json({msg: "Booking not found.CHeck your Booking Id"})
    }
    res.status(200).json(booking)
})

bookingRouter.get('/user',middlewares, async (req,res) => {
    try{
        const userId = req.user._id

        const bookings = await Booking.find({ userId })

        if(!bookings || bookings.length < 0) {
            return res.status(404).json({msg : "No booking record for the user, try booking available products"})
        }

        const formattedBookings = bookings.map(booking => {
            return {
                ...booking._doc, // Get the original booking fields
                bookedAt: new Intl.DateTimeFormat('en-KE', {
                    timeZone: 'Africa/Nairobi',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }).format(booking.bookedAt) // Format bookedAt to local time
            };
        });

        res.status(200).json(formattedBookings)
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    } 
})

bookingRouter.post('/create',middlewares, async (req,res) => {
    const {serviceType,partners,price} = req.body

    try {
        const userId = req.user.id
        console.log(userId)
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({msg: "User not found"})
        }

        const newBooking = new Booking({
            user : user.id,
            serviceType,
            partners,
            price,
            deliveryTime: new Date()
        })

        console.log(newBooking._id)
        const booking = await newBooking.save()
        
        user.bookings = user.bookings.concat(newBooking._id)
        await user.save()

        res.status(200).json(booking)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred while creating the booking. Please try again later.' })
    }
})

bookingRouter.put('/:id',middlewares,configs.isAdmin, async (req,res) => {
    const {status} = req.body
    const bookingId = req.params.id
    try{
        const booking = await Booking.findById(bookingId)

        if(!booking) {
            return res.status(404).json({msg: "NO Bookings Found"})
        }

        booking.status = status

        await booking.save()

        res.status(200).json(booking)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Update request denied"})
    }
})


module.exports = bookingRouter