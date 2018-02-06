const router = require("express").Router;
const {
    addInvoice,
    getAllInvoices,
    getInvoice,
} = require('./controller');

class InvoiceRouter {
    constructor() {
        this.router = router();
        this.router.post('/api/invoice', addInvoice);
        this.router.get('/api/invoice', getAllInvoices);
        this.router.get('/api/invoice/:id', getInvoice);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = InvoiceRouter;