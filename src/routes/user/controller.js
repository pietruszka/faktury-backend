const mongoose = require('mongoose');
const Invoice = (require('./../../data/db').getConnection()).model('Invoice');
const User = (require('./../../data/db').getConnection()).model('User');

const changeUserData = async (req, res) => {
    req.checkBody('companyName').exists();
    req.checkBody('nip')
        .exists()
        .isLength({min: 10, max: 10})
    req.checkBody('regon')
        .exists()
        .isLength({min: 7, max: 14});
    req.checkBody('street').exists();
    req.checkBody('buildingNumber').exists();
    req.checkBody('flatNumber').exists();
    req.checkBody('city').exists();
    req.checkBody('postalCode').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    const {
        companyName,
        nip,
        regon,
        street,
        buildingNumber,
        flatNumber,
        city,
        postalCode,
    } = req.body;

    const company = {
        name: companyName,
        nip,
        regon,
        street,
        buildingNumber,
        flatNumber,
        city,
        postalCode,
    };
    await User.findByIdAndUpdate(req.user, {
        $set: {
            company
        }
    });

    res.json({
        success: true,
        message: "User data changed."
    })

};

const getUserData = async (req, res) => {

    let result = await User.aggregate([{
        $match: {
            _id: new mongoose.mongo.ObjectId(req.user)
        }
    }, {
        $lookup: {
            from: 'Invoice',
            localField: 'invoices',
            foreignField: '_id',
            as: 'userInvoices'
        }
    },{
        $lookup: {
            from: 'Vehicle',
            localField: 'vehicles',
            foreignField: '_id',
            as: 'userVehicles'
        }
    },{
        $project: {
            _id: 0,
            email: 1,
            companyName: 1,
            nip: 1,
            regon: 1,
            street: 1,
            buildingNumber: 1,
            flatNumber: 1,
            city: 1,
            postalCode: 1,
            userInvoices: 1,
            userVehicles: 1
        }
    }]);

    res.json({
        success: true,
        message: "Send user data.",
        result
    })

};

module.exports = {
    changeUserData,
    getUserData,
};