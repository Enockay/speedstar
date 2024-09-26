const nodemailer = require('nodemailer')
const User = require('../models/user')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    logger: true,
    debug: true
})

const date = new Date()

const localTime = new Intl.DateTimeFormat('en-KE', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
}).format(date)

const isAdmin = async (req,res,next) => {
    const user = await User.findById(req.user.id)

    try{
        if (user && user.role === 'admin') {
            next()
        } else {
            return res.status(403).json({msg : "Admin access required"})
        } 

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "An error occured"})
    }
}

module.exports= {
    transporter,
    localTime,
    isAdmin
}