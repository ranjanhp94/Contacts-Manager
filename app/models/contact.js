const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: function (value) {
                return validator.isNumeric(value)
            },
            message: function () {
                return 'Invalid mobile number'
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'Invalid Email'
            }
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
    Contact
}