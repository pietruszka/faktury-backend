const router = require("express").Router;

class UserRouter {
    constructor() {
        this.router = router();
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserRouter;