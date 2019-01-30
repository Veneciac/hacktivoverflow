const Question = require('../models/Question')
const Answer = require('../models/Answer')
const ObjId = require('mongoose').Types.ObjectId
class Controller {
    static read (req, res) {
        Question.find({}).populate('user').populate('upvotes').populate('downvotes').exec()
            .then(data =>{
                res.status(200).json({
                    data
                })
            })
            .catch(err =>{
                res.status(500).json({
                    msg: err.messsage
                })
            })
    }

    static findOne (req, res) {
        res.status(200).json({
            data: req.currentQuestion
        })
        // Question.findById(req.params.id).populate('user').populate('upvotes').populate('downvotes').exec()
        //     .then(data => {
        //         if (!data) {
        //             res.status(404).json({
        //                 msg: `Data not found`
        //             })
        //         } else {
        //             res.status(200).json({
        //                 data
        //             })
        //         }
        //     })
        //     .catch(err => {
        //         res.status(500).json({
        //             msg: err.messsage
        //         })
        //     })
    }

    static create (req, res) {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                msg: `Title and description must be filled`
            })
        } else {
            let tags = req.body.tags

            let question = {
                user: req.currentUser._id,
                title: req.body.title,
                description: req.body.description,
                upvotes: [],
                downvotes: [],
                tags
            }

            Question.create(question)
                .then(data => {
                    res.status(201).json({
                        data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.messsage
                    })
                })

        }
    }
    
    static update (req, res) {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                msg: `Title and description must be filled`
            })
        } else {
            let tags = req.body.tags
            let title = req.body.title
            let description = req.body.description

            if (String(req.currentQuestion.user._id) !== String(req.currentUser._id)) {
                title = req.currentQuestion.title
                description = req.currentQuestion.description
                tags = req.currentQuestion.tags
            }

            let question = {
                title,
                description,
                upvotes: req.body.upvotes,
                downvotes: req.body.downvotes,
                tags
            }
            req.currentQuestion.set(question)
            req.currentQuestion.save()
                .then(data => {
                    res.status(200).json({
                        msg: `Success update`,
                        data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.messsage
                    })
                })
        }
    }

    static delete (req, res) {
        if (String(req.currentQuestion.user._id) == String(req.currentUser._id)) {
            req.currentQuestion.remove()
                .then(resp => {
                    Answer.deleteMany({question: ObjId(req.currentQuestion._id)}, (err) => {
                        if(err) {
                            console.log(err)
                        } else {
                            res.status(200).json({
                                msg: `Success delete`
                            })
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            res.status(403).json({
                msg: `You are not authorized to delete others question`
            })
        }

    }
}
module.exports = Controller