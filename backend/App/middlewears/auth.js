const jwt= require('jsonwebtoken')

const authenticateUser = (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
       return res.status(401).json( 'token is required')
       console.log(token)
    }
    try{
        const data = jwt.verify(token, process.env.SECREAT_KEY)
        req.currentUser = {
            id : data.id,
            role : data.role
        }
          next()
    }
    catch(err){
        console.log(err)
        return res.status(401).json({errors: errors.array()})
    }
}

const authorizeUser = (permittedRoles)=>{
    return (req, res, next)=>{
        if(permittedRoles.includes(req.currentUser.role)){ 
            next()
        }else {
            res.status(400).json({errors : errors.array()})
        }
    }
}

module.exports = {
    authenticateUser : authenticateUser ,
    authorizeUser :authorizeUser
}