const { check, validationResult } = require('express-validator/check');

/**
 * @api {get} /api/user/ Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
const getUser = (req, res) => {
    req.checkBody("b", "b is required field").notEmpty();
    var errors = req.validationErrors();
    console.log(req.body)
    if (errors) {
        res.status(200).json({
            b:6,
        })
        return;
    } else {
        // normal processing here
        res.status(200).json({
            b:7,
        })
    }

};

const addUser = (req, res) => {
    req.checkBody("b", "b is required field").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.status(200).json({
            b:6,
        })
        return;
    } else {
        // normal processing here
        res.status(200).json({
            b:7,
        })
    }

};

const removeUser = (req, res) => {
    res.status(200).json({
        b:7,
    })
};

module.exports = {
    getUser,
    addUser,
    removeUser,
}