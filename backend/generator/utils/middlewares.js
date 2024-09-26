const jwt = require('jsonwebtoken')

const authenticator = async (req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token) {
        return res.status(401).json({msg: "Access denied. No token found"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        console.log(req.user)
        next()
    }catch (error) {
        console.log(error.message)
        res.status(500).send("Server error")
    }
    
}

module.exports = authenticator