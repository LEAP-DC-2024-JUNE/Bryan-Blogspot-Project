const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.protect = async (request, response, next) => {
	const authorization = request.headers.authorization;

	if (!authorization || !authorization.startsWith("Bearer")) {
		return response.status(401).json({
			status: "Fail",
			message: "You are not logged in!"
		});
	}

	const token = authorization.split(" ")[1];

	if (!token) {
		return response.status(401).json({
			status: "Fail",
			message: "You are not logged in!"
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		console.log(decoded);
		request.user = await User.findById(decoded.id);

		if (!request.user) {
			return response.status(401).json({
				status: "Fail",
				message: "The user of this token no longer exists."
			});
		}

		next();
	} catch (error) {
		return response.status(401).json({
			status: "Fail",
			message: "Invalid token!"
		});
	}
};
