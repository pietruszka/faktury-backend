const router = require('express').Router;
const config = require('./../../data/config');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        let originalName = file.originalname;
        cb(null, `${originalName}`);
    }
});

const upload = multer({ storage: storage });

const authCheck = require('./../authMiddleware');
const {
    sendInvoice
} = require('./controller');

class InvoiceRouter {
    constructor() {
        this.router = router();
        this.router.post('/api/file',upload.any('invoice'), authCheck, sendInvoice);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = InvoiceRouter;