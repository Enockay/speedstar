const partnersRouter = require('express').Router()
const Partner = require('../models/partner')

partnersRouter.get('/', async (req, res) => {
    const partners = await Partner.find({})

    res.json(partners)
})

module.exports = partnersRouter