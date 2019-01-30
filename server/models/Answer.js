const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Question = require('./Question')

var answerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required']
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, `Question required`]
    },
    title: {
        type: String,
        required: [true, `Answer title required`]
    }, 
    description: {
        type: String,
        required: [true, `Answer description required`]
    }, 
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

answerSchema.post('save', function (val) {
    Question.findOneAndUpdate({_id: val.question}, { $push: { answer: val._id } },{new:true})
        .then(resp => {
            console.log('masuk hooks update ke question')
        })
        .catch(err => {
            console.log(err)
        })
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer