const User =require('../modles/user-model')

const userRegistraionSchema = {
    userName : {
        notEmpty : {
            errorMessage : 'username is required'
        },
        trim : true
    },
              
    email :{
        notEmpty :{
            errorMessage : 'email is required'
        }, 
        isEmail :{
            errorMessage : 'required valid email'
        },
        trim : true,
        normalizeEmail : true,
    custom :{
         options : async function(value){
         const user = await User.findOne({email : value}) 
          if(!user){
                return true
            }else {
                throw new Error('email already exists')
           }
         }
        }
    },
    
    password : {
        notEmpty : {
            errorMessage : 'password is required'
        }, 
        trim :true,
        isLength :{
            options :{ min :8 , max :128},
            errorMessage : 'password should contain 8 to 128 charecters'
        }
    },

    role :{
        notEmpty :{
            errorMessage : 'role is requied'
        },
        isIn:{
            options : [['candidate', 'recruiter']],
            errorMessage : 'role is to be in given list'
        }
    }
}

const userLoginShema = {
    email : {
    notEmpty :{
        errorMessage: 'email is required'
    },
    isEmail : {
        errorMessage : 'required valid email'
    },
    trim : true,
    normalizeEmail : true
    },

    password :{
       notEmpty :{
        errorMessage : 'password is required'
       },
       trim : true,
       isLength :{
        options : {min:8, max: 128},
        errorMessage :'password should be between 8 to 128 charecters'
        }
       }
    }

module.exports= {
    userRegistraionSchema : userRegistraionSchema,
    userLoginShema : userLoginShema
}