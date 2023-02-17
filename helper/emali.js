import nodemailer from 'nodemailer';
import ejs from 'ejs'
import path  from 'path'
import dev  from "../config/dev.config.json"
function sendMail(email) {
 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: dev.USER_EMAIL,
            pass: dev.USER_PASS
        }
    });

    let filepath = path.join(__dirname, "./views/emailTemplate.ejs");
    let responseData = {
        email: email,
    };
    ejs.renderFile(filepath, responseData, (err, data) => {
        if (err) 
            console.log(err)
         else {

            let mailOptions = {
                from: 'parampatel@gmail.com',
                to: email,
                subject: 'Forget password.',
                html: data.concat(`<a href=${
                    dev.FRONTEND_URL
                } > Forget password link..... </a>`)
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        }
    })
}


// module.exports = sendMail
export default sendMail