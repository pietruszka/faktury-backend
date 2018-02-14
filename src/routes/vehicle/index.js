const router = require("express").Router;
const authCheck = require('./../authMiddleware');
const {
    addVehicle
} = require("./controller");
class UserRouter {
    constructor() {
        this.router = router();
        this.router.post('/api/vehicle', authCheck, addVehicle);

    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserRouter;