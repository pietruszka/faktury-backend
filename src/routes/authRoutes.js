const router = require("express").Router;
const passport = require("passport");
const PassportLocal = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const config = require("./../data/config");
const User = (require('./../data/db').getConnection()).model("User");
const transporter = require('./../data/mailTransporter');

class AuthRouter {
    constructor() {
        this.router = router();
        this.router.use(passport.initialize());
        this.router.use(passport.session());

        passport.serializeUser( function( user, cb ) {
            cb( null, user );
        } );

        passport.deserializeUser( function( obj, cb ) {
            cb( null, obj );
        } );

        passport.use('local-register',new PassportLocal({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true,
        }, async (req, email, password, done) => {
            let foundUser = await User.findOne({email});
            if(!foundUser) {

                new User({
                    email,
                    password: bcrypt.hashSync(password),
                }).save(async (err, result) => {
                    await _sendConfirmationMail(email, result._id);
                    done(null, true);
                })
            } else {
                done(null, false);
            }
        }));
        this.router.post('/api/register', passport.authenticate('local-register', {
            successRedirect : `${config.HOST}/invoices`,
            failureRedirect : `${config.HOST}/register`,
        }));

        passport.use('local-login',new PassportLocal({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true,
        }, async (req, email, password, done) => {
            let foundUser = await User.findOne({email});
            if(!foundUser) {
                return done(null, {success: {success: false, message: "Account doesn't exist"}});
            } else {
                if(!foundUser.isConfirmed) {
                    return done(null, {success: false, message: "Account is not activated"});
                }
                if(bcrypt.compareSync(password, foundUser.password)){
                    const token = jwt.sign({id: foundUser._id}, config.JWT_SECRET);
                    return done(null, {success: true, token});
                } else {
                    return done(null, {success: false, message: "Wrong password"});
                }
            }
            return done(null, {success: false, message: "Err"});
        }));
        this.router.post('/api/login', passport.authenticate('local-login'), (req, res) => {
            res.json(req.user)
        });

        this.router.post('/api/changePassword', async (req, res) => {
            let email = req.body.email;
            await _sendRecoveryPasswordMail(email);
            res.redirect("/changepassword");
        })
    }

    getRouter() {
        return this.router;
    }
}

const _sendConfirmationMail = (email, id) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({id}, config.JWT_SECRET);

        let mailOptions = {
            from: config.EMAIL.USER,
            to: (config.TESTING ? config.TEST_EMAILS : email),
            subject: 'Invoices - potwierdzenie rejestracji',
            text: 'Hello world?',
            html: require('./email/emailContent')
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(true);
        });
    });
};

const _sendRecoveryPasswordMail = (email) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({email}, config.JWT_SECRET);

        let mailOptions = {
            from: config.EMAIL.USER,
            to: (config.TESTING ? config.TEST_EMAILS : email),
            subject: 'Invoices - zmiana hasła',
            text: 'Hello world?',
            html: `<a href="${config.HOST}/api/change?token=${token}">Zmień hasło</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(true);
        });
    });
};

module.exports = AuthRouter;