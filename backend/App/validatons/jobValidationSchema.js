const Job = require('../modles/job-model')

const jobValidationSchema = {
    title :{
        notEmpty :{
            errorMessage : 'title is required'
        },
        trim : true
    },

    description : {
        notEmpty :{
            errorMessage : 'description is required '
        }
    },

    Skills : {
        custom :{
            options : function(value){
                if(Array.isArray(value)){
                    throw new Error('skills should be array')
                }
                if(value.length ==0){
                    throw new Error('atlest one skill is needed')
                }
                if((value.every)(ele=>typeof ele !='string')){
                    throw new Error('skills should be string')
                }
                return true
            }
        }
    },

    location : {
        notEmpty : {
            errorMessage : 'location is required'
        }
    },

   "Salary.min" : {
    notEmpty :{
        errorMessage : 'minimum value is required'
    },
    isNumeric :{
        errorMessage : 'salary is to be number'
    }
    },
   "Salary.max":{
    notEmpty :{
        errorMessage : 'maximum salary is required'
    },
    isNumeric :{
        errorMessage : 'salary is to be number'
    },
    custom :{
           options : function(value ,{req}){
            if(value < req.body.Salary.min){
               throw new Error('salary is to be more then minimum salary')
            }else{
               return true
            }
           }
        }
   },

   Deadline :{
    notEmpty :{
        errorMessage : 'date is required is required'
    },
    isDate :{
            errorMessage :'date is required'
        },
    options : {
            function(value){
                if(new Date(value)< new Date()){
                    throw new Error(' date is to be on present date on onwords')
                }
                return true
            }
        }
    }
}

module.exports ={
     jobValidationSchema: jobValidationSchema
    }