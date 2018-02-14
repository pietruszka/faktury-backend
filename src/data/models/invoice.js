const mongoose = require("mongoose");

class InvoiceModel {
    constructor(connection) {
        this.model = connection.model("Invoice", this._invoiceModel(), "Invoice");
    }
    getModel() {
        return this.model;
    }

    _invoiceModel() {
        return new mongoose.Schema({
            isExpense: Boolean,
            invoiceNumber: String,
            createdPlace: String,
            description: String,
            date: {
                created: Date,
                sold: Date,
                payment: Date
            },
            paymentType: {
                type: String,
                enum: ['gotówka', 'przelew'],
                default: 'gotówka',
            },
            contractor: {
                name: String,
                place: String,
                phone: String,
                nip: String,
                postalCode: String,
                city: String
            },
            items: [{
                name: String,
                quantity: Number,
                unit: {
                    type: String,
                    enum: ['szt', 'kg', ' '],
                    default: 'szt',
                },
                vat: {
                    type: Number,
                    default: 23,
                },
                priceNet: Number,
            }],
            file: [String]
        });
    }
}

module.exports = InvoiceModel;