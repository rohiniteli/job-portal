require('dotenv').config()

const express =require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const app = express()
const port = 3007
app.use(express.json())
app.use(cors())
const userCtlr = require('./App/controllers/user-controllers')
const jobCtlr =require('./App/controllers/job-contrlooers')
const {userRegistraionSchema , userLoginShema} = require('./App/validatons/userValidationSchema')
const {jobValidationSchema} = require('./App/validatons/jobValidationSchema')
const {authenticateUser, authorizeUser } = require('./App/middlewears/auth')

const configuration = require('./config/db')
configuration()

app.post('/api/users/register',checkSchema(userRegistraionSchema), userCtlr.register)
app.post('/api/users/login',checkSchema(userLoginShema), userCtlr.login)
app.get('/api/users/account', authenticateUser , userCtlr.account)

app.post('/api/jobs',checkSchema(jobValidationSchema), authenticateUser , authorizeUser(['recruiter']), jobCtlr.Creat)
app.put('/api/jobs/:id' ,checkSchema(jobValidationSchema), authenticateUser, authorizeUser(['recruiter']), jobCtlr.update)
app.get('/api/jobs', jobCtlr.list)
app.get('/api/jobs/myposts' , authenticateUser , authorizeUser(['recruiter']), jobCtlr.myPosts)

app.listen(port, ()=>{
    console.log('server running on port', port)
    })



