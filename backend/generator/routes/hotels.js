const hotelRouter = require('express').Router()
const Hotel = require('../models/hotel')
const configs = require('../utils/configs')
const middlewares = require('../utils/middlewares')


hotelRouter.get('/', async (req,res) => {
    const hotels = await Hotel.find({})

    res.status(200).json(hotels)
})

hotelRouter.post('/',middlewares,configs.isAdmin, async (req,res) => {
    const {name, logo,meals} = req.body

    try{
        const newHotel = new Hotel({
            name,
            logo,
            meals
        })

        if(!name || !meals) {
            return res.status(404).json({msg: 'Name or menu missing!'})
        }
        await newHotel.save()
        res.status(200).json(newHotel)
    }catch(error) {
        console.error(error)
        res.status(500).json({msg: 'Error while creating new hotel'})
    }
})

module.exports = hotelRouter