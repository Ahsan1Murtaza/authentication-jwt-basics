const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database Connection Established")
    })
}

module.exports = connectToDB