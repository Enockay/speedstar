const reviewRouter = require('express').Router()
const Review = require('../models/review')

reviewRouter.get('/', async (req,res) => {
    const review = await Review.find({})

    res.json(review)
})

module.exports = reviewRouter