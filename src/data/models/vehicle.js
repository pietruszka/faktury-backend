const mongoose = require('mongoose');

class VehicleModel {
    constructor(connection) {
        this.model = connection.model('Vehicle', this._vahicleModel(), 'Vehicle');
    }
    getModel() {
        return this.model;
    }

    _vahicleModel() {
        return new mongoose.Schema({
            name: String,
            registerNumber: String,
            type: String,
            ownershipType: String,
            volume: Number,
            deductedCosts: Number
        });
    }
}

module.exports = VehicleModel;