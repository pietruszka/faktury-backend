const express = require("express");
const config = require("./data/config");
const Middleware = require("./middleware");
const InitRouter = require("./routes/index");
const logger = require("./data/logger");

class Application {
    constructor() {
        this.app = express();
        this.server = this.app.listen(config.PORT, () => {
            logger.log("info", `Server started on port ${config.PORT}`);
        });
        this.app.use(new Middleware().getRouter());
        this.app.use(new InitRouter().getRouter());
    }

    getServerInstance() {
        return this.server;
    }
}

module.exports = Application;