const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
   });

UserSchema.set('toJSON', {
    transform : (document, returnedData) => {
        returnedData.id = returnedData._id.toString()
        
        delete returnedData._id
        delete returnedData.__v
    }
})

module.exports = mongoose.model('User', UserSchema)