const router = require('express').Router;
const authCheck = require('./../authMiddleware');
const {
    confirmAccount,
    changePassword,
    newPassword,
} = require('./controller');

class EmailRouter {
    constructor() {
        this.router = router();
        this.router.get('/api/confirm', confirmAccount);
        this.router.get('/api/change', changePassword);
        this.router.post('/api/change', authCheck, newPassword);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = EmailRouter;