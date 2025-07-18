const express = require('express')
const authMiddleware = require('../middlewares/authentication')

const router = express.Router()


router.get('/home', authMiddleware, (req, res)=>{
    res.render('home')
})


module.exports = router