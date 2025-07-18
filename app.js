const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const dbConnection = require('./config/db.config')
const port = 3000

dotenv.config()
dbConnection()

const app = express()

app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRouter)
app.use('/', indexRouter)


app.listen(port, ()=>{
    console.log(`Server started on Port ${port}`)
})