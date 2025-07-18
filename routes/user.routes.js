const express = require('express')
const {body, validationResult, cookie} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const user = require('../models/user.model')


const router = express.Router()


router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', 
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
    
    async(req, res)=>{

        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid Data"
            })
        }

        const {username, email, password} = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password : hashedPassword
        })

        res.redirect('/user/login')

    // const newUser = await userModel.create()
    // console.log(username, email, password)

})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', 
    
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),

    async (req, res)=>{

        const errors =validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message : "Invalid Data"
            })
        }

        const {username, password} = req.body
        
        const user = await userModel.findOne({
            username : username
        })

        if (!user){
            return res.status(400).json({
                message : "Username or Password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({
                message : "Username or Password is incorrect"
            })
        }

        const token = jwt.sign({
            userId : user._id,
            username : username
        },
            process.env.JWT_SECRET
        )

        res.cookie('token', token)

        res.redirect('/home')
})


module.exports = router