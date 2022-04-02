const { USER_EMAIL, USER_NAME, ADDRESS } = require('./constants'); //TO-BE taken from DB
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (month, sentReading, email) => {
      const subjectField = 'Water meter reading - '+ month;
      const textField = 'Hello!\n\nThe water-meter reading for the month of '
      + month + ' is '+ sentReading +'\n'+ ADDRESS + '\n\n'+ USER_NAME;

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        }
      });
    
      const mailOptions = {
          from: USER_EMAIL,
          to: email,
          subject: subjectField,
          text: textField
      };

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error "+err);
        } else {
            console.log("Email sent successfully");
        }
    })
};

module.exports = sendMail;