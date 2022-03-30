const { USER_EMAIL, USER_NAME, READINGS_EMAIL, ADDRESS } = require('./constants'); //TO-BE taken from DB
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (month, sentReading) => {
      const subjectField = 'Water meter reading - '+ month;
      const textField = 'Hello!\n\nThe water-meter reading for the month of '
      + month + ' is '+ sentReading +'\n'+ ADDRESS + '\n\n'+ USER_NAME;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });
    
      const mailOptions = {
          from: USER_EMAIL,
          to: READINGS_EMAIL,
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