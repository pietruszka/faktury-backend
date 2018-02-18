const config = require('./config');
const mongoose = require('mongoose');
const winston = require('winston');
const Transport = require('winston-transport');

const logger = new winston.Logger();

class TransportDB extends Transport {
    constructor(opts) {
        super(opts);
        this.connection = mongoose.createConnection(config.DB_URL_ERROR, {
            auth: {
                password: config.DB_URL_ERROR_AUTH.PASSWORD,
                user: config.DB_URL_ERROR_AUTH.USER,
            },
        });

        this.connection.on('open', () => {
            logger.log('info', 'Connected to DB_ERR');
        });
        this.connection.on('disconnected', () => {
            logger.log('info', 'Disconnected from DB_ERR');
        });
        this.connection.on('error', () => {
            logger.log('error', 'DB_ERR connection error');
        });

        this.connection.model('Errors', new mongoose.Schema({
            date: {
                default: new Date(),
                type: Date,
            },
            message: String,
            type: String,
            values: mongoose.Schema.Types.Mixed,
        }));
    }

    log(info, message, values, cb) {
        if (info === 'error' || info === 'warn') {
            setImmediate(() => {
                const errorModel= this.connection.model('Errors');
                const error = new errorModel({
                    message,
                    type: info,
                    values: (values) ? values : {},
                }).save((err) => {});
            });
            cb();
        }
    }
}

if (!config.TESTING) {
    logger.add(TransportDB, {
        silent: false,
    });
} else {
    logger.add(winston.transports.Console, {
        colorize: true,
    });
}


module.exports = logger;