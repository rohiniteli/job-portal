const mongoose = require('mongoose')

const configuration = async() =>{
    try{
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/job-portal')
        console.log('connected to db')
    }
    catch(err){
        console.log('error connecting to db')
    }
}

module.exports=configuration