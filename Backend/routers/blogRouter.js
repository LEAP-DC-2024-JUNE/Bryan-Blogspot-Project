const express = require("express");
const blogController = require("../controllers/blogController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("", protect, blogController.createBlog);

router.get("/:blogId", blogController.readSingleBlog);

router.get("/author/:authorId", blogController.readBlogsByAuthor);

module.exports = router;
