const bcryptjs = require('bcryptjs')
const jwt= require('jsonwebtoken')
const User = require('../modles/user-model')
const { validationResult } = require('express-validator')
const userCtlr = {}

userCtlr.register = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.status(400).json({errors: errors.array()})
    }
    try{
        const { body } = req
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword
        await user.save()
        res.status(201).json(user)
    }
    catch(err){
      console.log('error')
    }
}

userCtlr.login = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
         res.status(404).json({errors :errors.array()})
    }
    try{
        const { body } = req
        const user = await User.findOne({email :body.email})
           
        if(!user){
            res.status(404).json({errors :'invalid email/password'})
        }
        
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if(!checkPassword){
             res.status(404).json({errors : 'invalid email /password'})
        }
        const tokenData = { id:user._id, role : user.role }
        const token= jwt.sign(tokenData, process.env.SECREAT_KEY, {expiresIn :'7d'})
        res.json({token :token})
    }
    catch(error){
        res.status(400).json({errors : 'error message'})
    }
}

userCtlr.account = async (req , res) =>{
    try{
        const user = await User.findById(req.currentUser.id).select({password : 0})
        res.json(user)
    }
    catch(err){
        res.status(401).json({errors: errors.array()})
    }
}

module.exports = userCtlr