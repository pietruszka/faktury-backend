const router = require("express").Router;
const authCheck = require('./../authMiddleware');
const {
    addVehicle,
    removeVehicle
} = require("./controller");
class UserRouter {
    constructor() {
        this.router = router();
        this.router.post('/api/vehicle', authCheck, addVehicle);
        this.router.delete('/api/vehicle/:id', authCheck, removeVehicle);

    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserRouter;