const { Schema , model} = require('mongoose')

const jobSchema = new Schema({
    title : String,
    description : String,
    Skills : [String],
    location : String,
    salary : {min:Number , max:Number},
    Deadline : Date,
}, {timestamps :true})

const Job = model('Job' , jobSchema)

module.exports = Job