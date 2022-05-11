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
});

module.exports = User;
