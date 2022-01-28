const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log',{
    interval: '1d',
    path: logDirectory
}); 

const development = {

    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'GJs3UBelj1DOsef0VLGldovT7Wy0j0eW',
    db: 'codeial_development',
    smtp: {

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'aravakrishnaveni2002@gmail.com',
            pass: 'ewxq tapv nqmb jfsv'
        } 
    
    
    },
    google_client_id: "470239071462-t9q596vd9hk1093l63hfvujolao4q4ml.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret_key : '1U0l3YUhwcWv5q2QcfotFiD4QZjVvx3L',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {

    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        } 
    
    
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret_key : process.env.CODEIAL_JWT_SECRET_KEY,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;