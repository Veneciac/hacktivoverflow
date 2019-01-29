const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { compare } = require('../helpers')
const mongoose = require('mongoose')

class Controller {
    static create (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                msg: `Email and password must be filled`
            })
        } else {
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                birthday: req.body.birthday
            }
            User.create(user)
                .then(data => {
                    res.status(201).json({
                        token: jwt.sign({id: data._id}, process.env.JWT),
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

    static login (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                msg: `Email and password must be filled`
            })
        } else {
            User.findOne({email: req.body.email})
                .then(found => {
                    if (!found) {
                        res.status(404).json({
                            msg: `Email / password wrong`
                        })
                    } else {
                        if (!compare(req.body.password, found.password)) {
                            res.status(400).json({
                                msg: `Email / password wrong`
                            })
                        } else {
                            res.status(200).json({
                                token: jwt.sign({id: found._id}, process.env.JWT),
                                data: found
                            })
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }

    static findOne (req, res) {
        res.status(200).json({
            data: req.currentUser
        })
        // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        //     res.status(400).json({
        //         msg: `Id invalid`
        //     })
        // } else {

        //     User.findById(req.params.id)
        //         .then(data =>{
        //             if (data) {
        //                 res.status(200).json({
        //                     data
        //                 })
        //             } else {
        //                 res.status(404).json({
        //                     msg: `User not found`
        //                 })
        //             }
        //         })
        //         .catch(err => {
        //             res.status(500).json({
        //                 msg: err.message
        //             })
        //         })
        // }
    }
}

module.exports = Controller