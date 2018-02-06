const router = require("express").Router;
const authCheck = require("./../authMiddleware");
const {
    getUser,
    addUser,
    removeUser,
} = require("./controller");

class UserRouter {
    constructor() {
        this.router = router();
        this.router.get("/", authCheck, getUser);
        this.router.post("/", authCheck, addUser);
        this.router.delete("/:id", authCheck, removeUser);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserRouter;