const Invoice = (require('./../../data/db').getConnection()).model("Invoice");
const { check, validationResult } = require('express-validator/check');

const addInvoice = (req, res) => {
    
};

const getAllInvoices = (req, res) => {

};

const getInvoice = (req, res) => {

};


module.exports = {
    addInvoice,
    getAllInvoices,
    getInvoice,
};