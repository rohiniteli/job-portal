const { Schema , model } = require('mongoose')

userSchema = new Schema({
    userName : String,
    email : String,
    password : String,
    role : String
    
},{timestamps : true})

const User = model('User' , userSchema)

module.exports= User
// const user1 = new User({userName:'chinnu',  email :'abc@gmail.com', password: 'seacret@123'})


// console.log(user1)