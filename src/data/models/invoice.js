const mongoose = require("mongoose");

class InvoiceModel {
    constructor(connection) {
        this.model = connection.model("Invoice", this._invoiceModel(), "InvoiceInvoices");
    }
    getModel() {
        return this.model;
    }

    _invoiceModel() {
        return new mongoose.Schema({
            email: String,
        });
    }
}

module.exports = InvoiceModel;