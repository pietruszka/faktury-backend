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
                name: {
                    type: String,
                    default: ''
                },
                nip: {
                    type: String,
                    default: ''
                },
                regon: {
                    type: String,
                    default: ''
                },
                street: {
                    type: String,
                    default: ''
                },
                buildingNumber: {
                    type: String,
                    default: ''
                },
                flatNumber: {
                    type: String,
                    default: ''
                },
                city: {
                    type: String,
                    default: ''
                },
                postalCode: {
                    type: String,
                    default: ''
                }
            },
            isConfirmed: {
                type: Boolean,
                default: false,
            },
        });
    }
}

module.exports = UserModel;