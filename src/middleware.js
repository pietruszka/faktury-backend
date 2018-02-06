const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const Router = require("express").Router;
const db = require("./data/db");
const logger = require("./data/logger");

class Middleware {
    constructor() {
        this.router = Router();
        this._initMiddleware();
    }

    _initMiddleware() {
        this.router.use(cors());
        this.router.use(bodyParser.json({
            limit: "100kb",
            type: "application/json",
        }));
        this.router.use(bodyParser.urlencoded({ extended: false }))
        this.router.use(expressValidator());
        logger;
        db;
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Middleware;