const nodemailer = require("nodemailer");

// Create a transporter using your email service's SMTP settings
const transporter = nodemailer.createTransport({
    service: "elasticemail",
    auth: {
        user: "chillappz@chill.com",
        pass: "SafePWD1",
    },
});

// Function to send an email alert
const sendEmailAlert = (to, subject, text) => {
    const mailOptions = {
        from: "chillappz@chill.com",
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

module.exports = sendEmailAlert;
