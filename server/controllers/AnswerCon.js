const Answer = require('../models/Answer')

class Controller {
    static read (req, res) {
        Answer.find({ question: req.currentQuestion._id }).populate('user').populate('question').populate('upvotes').populate('downvotes').exec()
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static create (req, res) {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                msg: `Title and description must be filled`
            })
        } else {
            let answer = {
                user: req.currentUser._id,
                question: req.currentQuestion._id,
                title: req.body.title,
                description: req.body.description,
                upvotes: [],
                downvotes: [] 
            }

            Answer.create(answer)
                .then(data => {
                    res.status(201).json({
                        data
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        msg: err.message
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
            let title = req.body.title
            let description = req.body.description

            if (String(req.currentAnswer.user._id) !== String(req.currentUser._id)) {
                title = req.currentAnswer.title
                description = req.currentAnswer.description
            }
            let answer = {
                title,
                description,
                upvotes: req.body.upvotes,
                downvotes: req.body.downvotes
            }

            req.currentAnswer.set(answer)
            req.currentAnswer.save()
                .then(data => {
                    res.status(200).json({
                        data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }
}

module.exports = Controller