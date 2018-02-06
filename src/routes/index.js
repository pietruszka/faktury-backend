const router = require("express").Router;
const UserRouter = require("./user");
const InvoiceRouter = require('./invoice');

class InitRouter {
    constructor() {
        this.router = router();
        this.router.use("/api/user", new UserRouter().getRouter());
        this.router.use(new InvoiceRouter().getRouter());
    }

    getRouter() {
        return this.router;
    }
}

module.exports = InitRouter;