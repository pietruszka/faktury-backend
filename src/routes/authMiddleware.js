const jwt = require('jsonwebtoken');
const config = require('./../data/config');
const User = (require('./../data/db').getConnection()).model('User');

const checkAuth = async (req, res, next) => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization, config.JWT_SECRET, async (err, decoded) => {
            if(err) {
                res.json({
                    success: false,
                    message: 'Token err'
                });
            }
            let foundUser = await User.findById(decoded.id);
            if(foundUser) {
                req.user = decoded.id;
                next();
            } else {
                res.json({
                    success: false,
                    message: 'Token doesnt match'
                });
            }
        });

    } else {
        res.json({
            success: false,
            message: 'Header doesnt appear'
        });
    }
};

module.exports = checkAuth;