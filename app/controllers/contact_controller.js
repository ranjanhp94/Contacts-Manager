const express = require('express');
const router = express.Router()
const { Contact } = require('../models/contact')
const { authenticateUser } = require('../middlewares/authentication')

// list all contact
router.get('/', authenticateUser, (req, res) => {
    // console.log(req.user) => all the user related information will be displayed
    Contact.find({ user: req.user._id })
        .then((contacts) => {
            res.send(contacts)
        })
        .catch((err) => {
            res.send(err)
        })
})

// new contact
router.post('/', authenticateUser, (req, res) => {
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    contact.save()
        .then((contact) => {
            res.send(contact)
        })
        .catch((err) => {
            res.send(err)
        })
})

// to get one contact
router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Contact.findById(id)
        .then((contact) => {
            if (contact) {
                res.send(contact)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

// to update contact
router.put('/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
    Contact.findOneAndUpdate({ _id: id }, { $set: data }, { new: true, runValidators: true })
        .then((contact) => {
            if (contact) {
                res.send(contact)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

// to delete contact
router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Contact.findByIdAndDelete(id)
        .then((contact) => {
            if (contact) {
                res.send(contact)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    contactRouter: router
}