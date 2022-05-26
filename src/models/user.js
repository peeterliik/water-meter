const mongoose = require("mongoose");

const User = mongoose.model("User", {
	name: {
		type: String,
	},
	address: {
		type: String,
	},
	recipient: {
		type: String,
	},
	schedule: {
		type: Number,
		default: 0,
	},
});

module.exports = User;
