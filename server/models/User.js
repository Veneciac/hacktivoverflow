const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { genPass } = require('../helpers')

function checkUnique () {
    return new Promise((res, rej) => {
        User.findOne({email : this.email, _id: {$ne: this._id}})
            .then(found => {
                if (found) {
                    res(false)
                } else {
                    res(true)
                }
            })
            .catch(err => {
                res(false)
            })
    })
}

var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [checkUnique, 'Email already taken']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    birthday: {
        type: Date
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = genPass(this.password)
    }
    next()
})

var User = mongoose.model('User', userSchema)
module.exports = User