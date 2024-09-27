const partnersRouter = require('express').Router()
const Partner = require('../models/partner')
const configs = require('../utils/configs')
const middlewares = require('../utils/middlewares')

partnersRouter.get('/', async (req, res) => {
    const partners = await Partner.find({})

    res.json(partners)
})

partnersRouter.post('/',middlewares,configs.isAdmin, async (req,res) => {
    const {name,logoUrl,serviceType,contactInfo,deals,address} = req.body

    try{
        const {phone,email,address: contactAddress} = contactInfo
        const partner = new Partner({
            name,
            logoUrl,
            serviceType,
            contactInfo : {
                phone,
                email,
                address : contactAddress
            },
            deals,
            address
        })

        if (!name || !logoUrl || !serviceType || !phone || !email || !contactAddress) {
            return res.status(400).json({ msg: "Missing required fields" });
        }
        console.log(partner)

        await partner.save()

        res.status(200).json({msg: "New partner added succeessfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg : "Partner creation failed"})
    }
})

partnersRouter.put('/:id',middlewares, configs.isAdmin, async (req,res) => {
    const {serviceType,contactInfo,address} = req.body

    try{
        const {phone,email,contactAddress} = contactInfo

        const partners = {
            serviceType,
            contactInfo: {
                phone,
                email,
                address: contactAddress
            },
            address
        }

        await Partner.findByIdAndUpdate(req.params.id,partners,{new: true})

        
        res.status(200).json({msg: "Partner information updated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Failed to update partner's info"})
    }
})

partnersRouter.delete('/:id', middlewares,configs.isAdmin, async (req,res) => {
    try {
        const partnerId = req.params.id

        await Partner.findByIdAndDelete(partnerId)

        res.status(200).json({msg: "Partner eliminated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Error eliiminting partner"})
    }
})

module.exports = partnersRouter