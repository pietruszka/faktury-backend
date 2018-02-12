const mongoose = require('mongoose');
const Vehicle = (require('./../../data/db').getConnection()).model('Vehicle');
const User = (require('./../../data/db').getConnection()).model('User');

const addVehicle = async (req, res) => {
    req.checkBody('name').exists();
    req.checkBody('registerNumber')
        .exists()
        .custom(value => {
            return new Promise((resolve, reject) => {
                Vehicle.findOne({registerNumber: value}, (err, result) => {
                    if(result) reject();
                    else resolve();
                });
            });
        })
        .withMessage("Register number should be unique");
    req.checkBody('type').exists();
    req.checkBody('ownershipType').exists();
    req.checkBody('volume').exists();
    req.checkBody('deductedCosts').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    const {
        name,
        registerNumber,
        type,
        ownershipType,
        volume,
        deductedCosts
    } = req.body;

    let _vehicle = await new Vehicle({
        name,
        registerNumber,
        type,
        ownershipType,
        volume,
        deductedCosts
    }).save();

    await User.findByIdAndUpdate(req.user, {
        $addToSet: {
            vehicles: new mongoose.mongo.ObjectId(_vehicle._id)
        }})


    res.json({
        success: true,
        message: "Adding new vehicle"
    })

};

module.exports = {
    addVehicle,
};