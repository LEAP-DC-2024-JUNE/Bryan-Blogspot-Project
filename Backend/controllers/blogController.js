const Blog = require("../models/blogModel");

// Create a new blog
exports.createBlog = async (request, response) => {
	try {
		const { title, content } = request.body;
		const author = request.user.id;

		if (!title || !content) {
			return response.status(400).json({
				status: "Fail",
				message: "Title and content are required."
			});
		}

		if (!author) {
			return response.status(401).json({
				status: "Fail",
				message: "Please log in."
			});
		}

		const newBlog = await Blog.create({ title, content, author });

		response.status(201).json({
			status: "Success",
			message: "Blog created."
		});
	} catch (error) {
		response.status(500).json({
			status: "Fail",
			message: "Internal server error."
		});
	}
};

// Read a single blog
exports.readSingleBlog = async (request, response) => {
	try {
		const { blogId } = request.params;

		const blog = await Blog.findById(blogId);

		if (!blog) {
			return response.status(404).json({
				status: "Fail",
				message: "Blog not found"
			});
		}

		return response.json({
			status: "Success",
			data: { blog }
		});
	} catch (error) {
		response.status(500).json({
			status: "Fail",
			message: "Internal server error."
		});
	}
};

// Read all blogs by author
exports.readBlogsByAuthor = async (request, response) => {
	try {
		const { authorId } = request.params;

		const blogs = await Blog.find({ author: authorId });

		if (!blogs) {
			return response.status(404).json({
				status: "Fail",
				message: "No blogs found for this author."
			});
		}

		return response.json({
			status: "Success",
			data: { blogs }
		});
	} catch (error) {
		response.status(500).json({
			status: "Fail",
			message: "Internal server error."
		});
	}
};
