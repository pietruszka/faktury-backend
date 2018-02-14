const IS_PROD = (process.env.NODE_ENV === 'production');
const IS_TEST_MODE = (process.env.TEST_MODE === 'true');

const CONFIG = {
    PORT: (IS_PROD) ? process.env.INVOICE_PORT : 3005,
    HOST: "http://localhost:3005",
    DB_URL: ((IS_PROD) ? process.env.DB_URL : "mongodb://ds245715.mlab.com:45715/hack"),
    DB_URL_AUTH: {
        PASSWORD: "admin",
        USER: "admin",
    },
    DB_URL_ERROR: ("mongodb://ds133017.mlab.com:33017/error"),
    DB_URL_ERROR_AUTH: {
        PASSWORD: "admin",
        USER: "admin",
    },
    TESTING: IS_TEST_MODE,
    HASH_PASSWORD_SECRET: "hashsecret",
    JWT_SECRET: "jwtsecret",
    UPLOAD_PATH: "uploads/",
    EMAIL: {
        HOST: "smtp.gmail.com",
        USER: "invoice.2018.test@gmail.com",
        PASSWORD: "qwerty123qwerty"
    },
    TEST_EMAILS: "piotr.pietruszka@o2.pl,przemek.rakowski@gmail.com"
};
module.exports = CONFIG;