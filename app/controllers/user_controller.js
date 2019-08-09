const express = require('express');
const router = express.Router()
const { User } = require('../models/user');
const { authenticateUser } = require('../middlewares/authentication');

router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.send(users)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send({
                user,
                notice: 'Successfully Registered'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/login', (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(function (user) {
            return user.generateToken()
        })
        .then(function (token) {
            res.setHeader('x-auth', token).send({})
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.delete('/logout', authenticateUser, function (req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(function () {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(function (err) {
            res.send(err)
        })
})

module.exports = {
    userRouter: router
}