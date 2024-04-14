const { Schema , model} = require('mongoose')

const applicationModel = new Schema({
    jobID : {
     type : Schema.Types.ObjectId,
     ref : 'Job'
    },
    candidateId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
    },
    coverLetter : String,
    status :{
        type : String,
        // enum : ['submitted', 'review', 'accepted','rejected'],
        default : 'submitted'
    },
    
    additionalInfo : String

}, {timestamps : true})

const Application = model('Application' , applicationModel)

module.exports = Application