const { validationResult} = require('express-validator')
const Job =require('../modles/job-model')
const jobCtlr = {}

jobCtlr.Creat = async(req, res) =>{
 const errors = validationResult(req)
 if(!errors.isEmpty()){
    return res.status(400).json({errors :errors.array()})
 }
  const { body} = req
  const job = new Job(body)
  try{
    await job.save()
    res.status(201).json(job)
  }
  catch(err){
    res.status(400).json({error :errors.array()})
  }
}

jobCtlr.list = async (req,res)=>{
  try{
    const jobs = await Job.find().sort({createdAt :-1})
    res.status(200).json(jobs)
    }
    catch(error) {
          res.status(400).json({errors : errors.array()})
    } 
}

jobCtlr.myPosts = async (req, res)=>{
  try{
    const jobs = await Job.find({recruiterId : req.user.id}).sort({createdAt : -1})
  }
  catch(err){
    console.log(err)
    res.status(500).json({errors : errors.array()})
  }
}

jobCtlr.update = async (req , res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.status(401).json({errors: errors.array()})
  }
  try{
    const id= req.params.id
    const job = await Job.findOneAndUpdate({_id:id, recruiterId:req.currentUser.id}, body, {new :true})
    res.json(job)
  }
  catch(err){
    res.status(401).json({errors: errors.array()})
  }
}

module.exports = jobCtlr