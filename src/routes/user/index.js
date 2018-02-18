const router = require('express').Router;
const authCheck = require('./../authMiddleware');
const {
    changeUserData,
    getUserData,
} = require('./controller');
class UserRouter {
    constructor() {
        this.router = router();
        this.router.put('/api/user', authCheck, changeUserData);
        this.router.get('/api/user', authCheck, getUserData);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserRouter;