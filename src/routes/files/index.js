const router = require("express").Router;
const uuidv4 = require('uuid/v4');
const config = require('./../../data/config');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        let originalName = file.originalname;
        let extension = new RegExp('.([A-Za-z]+)$').exec(originalName)
        cb(null, `${uuidv4()}.${extension[1]}`);
    }
})

var upload = multer({ storage: storage });

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