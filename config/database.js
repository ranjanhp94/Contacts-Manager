const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27018/contacts-manager'

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(function () {
        console.log('connected to db')
    }).catch(function () {
        console.log('error connecting to db')
    })

module.exports = {
    mongoose
}