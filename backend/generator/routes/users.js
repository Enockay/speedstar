var express = require('express');
var jwt = require('jsonwebtoken')
var usersRouter = express.Router();
var User = require('../models/user')
var bcrypt = require('bcrypt');
var configs = require('../utils/configs')



usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('bookings')

  res.json(users)
})

usersRouter.post('/register', async (req,res) => {
  const {firstName, secondName, email, password, phone, address,role} = req.body

  try {
    const date = new Date()
    const existingUser = await User.findOne({email})
    if(existingUser) {
      return res.status(400).render('index', {msg : 'user already exists, try log in'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
  
    const newUser = new User({
      firstName,
      secondName,
      email,
      password : passwordHash,
      phone,
      address,
      createdAt: date,
      role
    })
    console.log(newUser)
  
    await newUser.save()

    const userForToken = {
      username : newUser.username,
      id : newUser._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn : '1h'})

    res.status(201).json(token)
    } catch (error) {
      console.error(error.message)

      res.status(500).send('Server error')
    }

})


usersRouter.post('/login', async (req,res) => {
  const {email, password} = req.body

  try {
    const existingUser = await User.findOne({email})
    if(!existingUser) {
      return res.status(400).json({ msg : 'Invalid email or password'})
    }

    const passwordMatch = bcrypt.compare(password, existingUser.password)
    if(!passwordMatch) {
      return res.status(400).json({msg: "Invalid email or password"})
    }

    const userForToken = {
      firstName : existingUser.firstName,
      id : existingUser._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).json({token,email})

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error')
  }

})

usersRouter.post('/forgot-password', async (req,res) => {
  const {email} = req.body

  try{
    const user = await User.findOne({email})
    if(!user) {
      return res.status(404).json({msg: "User not found"})
    }

    //generate a password reset token
    const resetToken = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '1hr'})

    //create a reset url
    const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`

    //email option
    const mailOption = {
      from : process.env.EMAIL,
      to : user.email,
      subject : 'Password reset request',
      text : `You requested a password reset. Click the link to reset your password: ${resetUrl}`

    }

    configs.transporter.sendMail(mailOption)
    
    res.status(200).json({msg: "Password reset email sent"})
  } catch(error) {
      console.log(error.message)
      res.status(500).send('Server error')
  }
})


usersRouter.post('/reset-password/:token', async (req, res) => {
  const {password} = req.body
  const {token} = req.params

  try {
    //verify token first

    const decoded = jwt.verify(token, process.env.SECRET)
    const userId = decoded.id

    //new password validation
    if(!password || password.length < 6) {
      return res.status(400).json({msg : "password must be 6 characters and longer"})

    }

    //hash the new password
    const saltRounds = 10
    const passwordHash = bcrypt.hash(password, saltRounds)

    //update user password
    await User.findByIdAndUpdate(userId, {password: passwordHash})

    res.status(200).json({msg : "Password reset successfully"})
  } catch (error) {
    console.error(error.message);
    //  token verification errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ msg: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ msg: 'Token has expired' });
    }
    res.status(500).send('Server error');
  }
})

module.exports = usersRouter
