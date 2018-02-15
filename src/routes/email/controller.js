const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt-nodejs");
const User = (require('./../../data/db').getConnection()).model("User");
const config = require('./../../data/config');

const confirmAccount = async (req, res) => {
    req.checkQuery('token').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    let token = req.query.token;
    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if(err) {
            res.json({
                success: false,
                message: "Token err"
            });
        }
        let foundUser = await User.findById(decoded.id);
        if(foundUser) {
            await User.findByIdAndUpdate(decoded.id, {$set: {isConfirmed: true}})
            res.redirect(`${config.HOST}/invoices`);
        } else {
            res.redirect(`${config.HOST}/register`);
        }
    });
};

const changePassword = async (req, res) => {
    req.checkQuery('token').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    let token = req.query.token;
    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if(err) {
            res.json({
                success: false,
                message: "Token err"
            });
        }
        let foundUser = await User.findOne({email: decoded.email});
        if(foundUser) {
            const token = jwt.sign({id: foundUser._id}, config.JWT_SECRET);
            res.cookie('token' , token);
            res.redirect("/changepassword");
        } else {
            res.redirect("/register2");
        }
    });
};

const newPassword = async (req, res) => {
    req.checkBody('password').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    await User.findByIdAndUpdate(req.user, {
        $set: {
            password: bcrypt.hashSync(req.body.password)
        }});

    return res.status(200).json({
        success: true,
        message: "Changed password"
    });
};

module.exports = {
    confirmAccount,
    changePassword,
    newPassword,
};