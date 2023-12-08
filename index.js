const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use('/users',userRouter)
app.use('/',indexRouter)

app.listen(PORT,()=>console.log('server listening'+PORT))


