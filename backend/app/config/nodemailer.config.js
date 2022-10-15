const nodemailer = require("nodemailer");
const config = require("../config/auth.config");
const user = config.user;
const pass = config.pass;

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
    auth: {
        user: user,
        pass: pass
        // antonlomovatskyivetmailerpass
    }
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    let mailOptions = {
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:8080/api/auth/confirm/${confirmationCode}> Click here</a>
            </div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });

};