var dbUser = require('../models/userLogin');
var jwt = require('jsonwebtoken')

exports.registration = (req,res)=>{
    if(!req.body.name||!req.body.email||!req.body.password){
        res.json({
            success: false,
            msg: "Please enter all details."
        })
    }else{
        new dbUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).save((err, data)=>{
            if(err){
                res.json({
                    success: false,
                    msg: "database error"
                })
            }else{
                res.json({
                    success: true,
                    msg: "Data saved"
                })
            }
        })
    }
}

exports.login = (req,res)=>{
    if(!req.body.email|| !req.body.password){
        res.json({
            success: false,
            msg: "Please enter all details"
        })
    }else{
        dbUser.findOne({email: req.body.email}, (err, lData)=>{
            if(err){
                res.json({
                    success: false,
                    msg: "databse error"
                })
            }else if(!lData){
                res.json({
                    success: false,
                    msg: "Please register first."
                })
            }else if(lData.password!=req.body.password){
                res.json({
                    success: false,
                    msg: "incorrect password"
                })
            }else{
                var tokendata = {
                    name: lData.name,
                    email: lData.email
                }
                var token = jwt.sign(tokendata, req.app.get('secret'));
                res.json({
                    success: true,
                    msg: "Login Successfull",
                    token: token,
                    name: lData.name
                })
            }
        })
    }
}