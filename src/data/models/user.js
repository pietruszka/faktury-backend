const mongoose = require("mongoose");

class UserModel {
    constructor(connection) {
        this.model = connection.model("User", this._userModel(), "UserInvoices");
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
            settings: {
                companyName: String,
                nip: Number,
                regon: Number,
                street: String,
                houseNumber: Number,
                flatNumber: Number,
                city: String,
            }
        });
    }

    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };
}



module.exports = UserModel;
