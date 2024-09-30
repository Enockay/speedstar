const cartRouter = require('express').Router()
const Cart = require('../models/cart')

cartRouter.post('/', async (req, res) => {
    const {cart, mpesaNumber, email, deliveryPoint} = req.body

    try {
        const totalAmount = cart.reduce((sum, item) => sum + (item.price *
            item.quantity + item.deliveryFee), 0)

        const newCart = new Cart({
            email,
            mpesaNumber,
            deliveryPoint,
            cartItems : cart,
            totalAmount,
        }) 

        await newCart.save()

        res.status(200).json({ status: 'success', totalAmount })
    }  catch (error) {
        console.error('Error saving cart data:', error);
        res.status(500).json({ error: 'Failed to process cart' });
    }
})

module.exports = cartRouter