const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

//tells from where to send the mails
let transporter = nodemailer.createTransport(env.smtp);

//when we are sending an html email where html file is palced in mailers under views 
let renderTemplate = (data,relativePath) => {

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering the template ",err);
                return;
            }

            mailHTML = template;

        }
    )

    return mailHTML;

}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate

}