const nodeMailer = require('../config/nodemailer');

//this another way of exporting a method
exports.newComment = (comment) => {

    console.log('Inside newComment mailer');

    let htmlString  = nodeMailer.renderTemplate({comment: comment},'./comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from: 'aravakrishnaveni2002@gmail.com',
        to: comment.user.email,
        subject: "Your New Comment published",
        html: htmlString
    },(err,info) => {
        if(err){
            console.log("Error in sending the mail ",err);
            return;
        }

        // console.log("Message sent ",info);
        return;
    });
}