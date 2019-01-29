const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required']
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    title: {
        type: String,
        required: [true, `Question title required`]
    }, 
    description: {
        type: String,
        required: [true, `Question description required`]
    }, 
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: [{
        type: String
    }]
}, {
    timestamps: true
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question