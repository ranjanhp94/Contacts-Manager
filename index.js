const express = require('express');
const { mongoose } = require('./config/database');
const app = express()

const { userRouter } = require('./app/controllers/user_controller');
const { contactRouter } = require('./app/controllers/contact_controller');
const port = process.env.PORT || 3005

app.use(express.json())

app.use('/contacts', contactRouter)
app.use('/user', userRouter)

app.listen(port, function () {
    console.log('listening to port', port)
})