const mongoose = require('mongoose')

const PartnerSchema = new mongoose.Schema({
    name: String,
    logoUrl: String,
    serviceType: { type: String, enum: ['hotel', 'supermarket', 'mover', 'parcel'] },
    contactInfo: {
    phone: String,
    email: String,
    address: String,
    },
    deals: [{ description: String, discount: Number }],
    createdAt: { type: Date, default: Date.now },
   });


PartnerSchema.set('toJSON', {
    transform : (document,requestedData) => {
        requestedData.id = requestedData._id.toString()

        delete requestedData._id
        delete requestedData.__v
    }
})

module.exports = mongoose.model('Partner', PartnerSchema)