const nodemailer = require('nodemailer');
const config = require('./config');

module.exports = nodemailer.createTransport({
    host: config.EMAIL.HOST,
    port: 587,
    secure: false,
    auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASSWORD
    }
});