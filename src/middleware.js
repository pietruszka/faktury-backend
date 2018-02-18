const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const path = require('path');
const Router = require('express').Router;
const express = require('express');

const db = require('./data/db');
const logger = require('./data/logger');

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
            type: 'application/json',
        }));
        this.router.use(bodyParser.urlencoded({ extended: false }));
        this.router.use(expressValidator());
        this.router.use('/', express.static(path.join(__dirname, '..', 'public')));
        logger;
        db;
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Middleware;