const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, name, email) => {
	return jwt.sign({id, name, email}, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

exports.signup = async (request, response) => {
	try {
		const aUser = await User(request.body);
		const newUser = await aUser.save();

		jwtToken = generateToken(newUser._id, newUser.name, newUser.email);
		
		response.status(201).json({
			status: "Success",
			data: { user: newUser },
			token: jwtToken
		});
	} catch (error) {
		if (error.name === "ValidationError" || error.name === "MongoServerError"
			&& error.code === 11000) {
			response.status(400).json({
				status: "Fail",
				message: error.message
			});
		}
		response.status(500).json({
			status: "Fail",
			message: error.message
		});
	}
};

exports.login = async (request, response) => {
	const { email, password } = request.body;

	if (!email || !password) {
		response.status(400).json({
			status: "Fail",
			message: "Please provide email and password."
		});
	}

	try {
		const user = await User.findOne({ email }).select("+password");
		if (!user || !(await user.checkPassword(password, user.password))) {
			response.status(401).json({
				status: "Fail",
				message: "Please provide the correct email and password."
			});
		}

		const jwtToken = generateToken(user._id, user.name, user.email);

		response.json({
			status: "Success",
			message: "Logged in successfully.",
			token: jwtToken
		});

	} catch (error) {
		response.status(500).json({
			status: "Fail",
			message: error.message
		});
	}
};
