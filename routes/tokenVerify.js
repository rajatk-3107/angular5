var jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (!req.headers['x-access-token']) {
        res.json({
            success: false,
            msg: "Please provide token."
        })
    } else {
        jwt.verify(req.headers['x-access-token'], req.app.get('secret'), (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Token not verified"
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}