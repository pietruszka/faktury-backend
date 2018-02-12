const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const morgan = require('morgan');
const Router = require("express").Router;
const fileUpload = require('express-fileupload');

const db = require("./data/db");
const logger = require("./data/logger");

class Middleware {
    constructor() {
        this.router = Router();
        this._initMiddleware();
    }

    _initMiddleware() {
        this.router.use(cors());
        this.router.use(morgan('combined'))
        this.router.use(bodyParser.json({
            limit: '5mb',
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