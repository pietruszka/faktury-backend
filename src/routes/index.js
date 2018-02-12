const router = require("express").Router;
const InvoiceRouter = require('./invoice');
const FileRouter = require('./files');
const AuthRouter = require('./authRoutes');
const UserRouter = require('./user');
const PDFRouter = require('./pdf');
const VehicleRouter = require('./vehicle');
const EmailRouter = require('./email');

class InitRouter {
    constructor() {
        this.router = router();
        this.router.use(new AuthRouter().getRouter());
        this.router.use(new InvoiceRouter().getRouter());
        this.router.use(new FileRouter().getRouter());
        this.router.use(new PDFRouter().getRouter());
        this.router.use(new UserRouter().getRouter());
        this.router.use(new VehicleRouter().getRouter());
        this.router.use(new EmailRouter().getRouter());
    }

    getRouter() {
        return this.router;
    }
}

module.exports = InitRouter;