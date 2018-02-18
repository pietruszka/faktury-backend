const router = require('express').Router;
const authCheck = require('./../authMiddleware');
const {
    generatePDFInvoice
} = require('./controller');

class PDFRouter {
    constructor() {
        this.router = router();
        this.router.get('/api/pdf/:invoice', generatePDFInvoice);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = PDFRouter;