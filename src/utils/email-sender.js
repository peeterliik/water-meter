const { USER_EMAIL } = require("./constants"); //TO-BE taken from DB
const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../models/user");

const sendMail = async (month, sentReading, email) => {
	try {
		const user = await User.findOne();

		const subjectField = "Water meter reading - " + month;
		const textField =
			"Hello!\n\nThe water-meter reading for the month of " +
			month +
			" is " +
			sentReading +
			"\n" +
			user.address +
			"\n\n" +
			user.name;

		const transporter = nodemailer.createTransport({
			host: "smtp.office365.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: USER_EMAIL,
			to: email,
			subject: subjectField,
			text: textField,
		};

		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				console.log("Error " + err);
			} else {
				console.log("Email sent successfully");
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = sendMail;
