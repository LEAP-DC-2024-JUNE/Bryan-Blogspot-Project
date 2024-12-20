const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a name."]
	},
	email: {
		type: String,
		required: [true, "Please provide an email."],
		unique: [true, "This email is already in use."],
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email."]
	},
	password: {
		type: String,
		required: [true, "Please provide a password."],
		minlength: 8,
		select: false
	},
	confirmPassword: {
		type: String,
		required: [true, "Please confirm the password."],
		validate: {
			validator: function (element) {
				return element === this.password;
			},
			message: "The passwords do not match."
		}
	}
});


userSchema.pre("save", async function () {
	this.password = await bcrypt.hash(this.password, 12);
	this.confirmPassword = undefined;
});


userSchema.methods.checkPassword = async function (inputPassword, userPassword) {
	const isCorrect = await bcrypt.compare(inputPassword, userPassword);
	return isCorrect;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
