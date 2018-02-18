const mongoose = require('mongoose');

class UserModel {
    constructor(connection) {
        this.model = connection.model('User', this._userModel(), 'UserInvoices');
    }
    getModel() {
        return this.model;
    }

    _userModel() {
        return new mongoose.Schema({
            email: String,
            password: String,
            invoices: [mongoose.Schema.Types.ObjectId],
            vehicles: [mongoose.Schema.Types.ObjectId],
            company : {
                name: String,
                nip: String,
                regon: String,
                street: String,
                buildingNumber: String,
                flatNumber: String,
                city: String,
                postalCode: String
            },
            isConfirmed: {
                type: Boolean,
                default: false,
            },
        });
    }
}

module.exports = UserModel;