const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please provide a title."]
	},
	content: {
		type: String,
		required: [true, "Please provide a content."]
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});


const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
