var dbContact = require('../models/contact')

exports.showContacts = (req, res) => {
    dbContact.findOne({ email: req.decoded.email }, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: "Error while searching for contacts"
            })
        } else if (!data || data.length == 0) {
            res.json({
                success: false,
                msg: "No contacts found"
            })
        } else {
            res.json({
                success: true,
                data: data
            })
        }
    })
}

exports.addContact = (req, res) => {
    if (!req.body.name || !req.body.phone) {
        res.json({
            success: false,
            msg: "Please enter all details"
        })
    } else {
        dbContact.findOne({ email: req.decoded.email }, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error in database while searching for user"
                })
            } else if (!data) {
                new dbContact({
                    email: req.decoded.email,
                    contact: [{
                        name: req.body.name,
                        phone: req.body.phone
                    }]
                }).save((err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Error while saving"
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "Contact saved"
                        })
                    }
                })
            } else {
                dbContact.findOneAndUpdate({ email: req.decoded.email }, { $push: { contact: { name: req.body.name, phone: req.body.phone } } }, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Error while saving new contact."
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "New contact saved"
                        })
                    }
                })
            }
        })
    }
}