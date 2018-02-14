const router = require("express").Router;
const authCheck = require('./../authMiddleware');
const {
    addInvoice,
    getAllInvoices,
    getInvoice,
    addInvoiceItem,
    removeInvoice
} = require('./controller');

class InvoiceRouter {
    constructor() {
        this.router = router();
        this.router.post('/api/invoice', authCheck, addInvoice);
        this.router.post('/api/invoice/item', authCheck, addInvoiceItem);
        this.router.get('/api/invoice', authCheck, getAllInvoices);
        this.router.get('/api/invoice/:id', authCheck, getInvoice);
        this.router.delete('/api/invoice/:id', authCheck, removeInvoice);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = InvoiceRouter;