const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  sharePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/upload");

// Post CRUD routes - all require authentication
router
  .route("/")
  .post(protect, upload.array("media", 10), createPost) // Create post with up to 10 media files
  .get(protect, getPosts); // Get paginated feed

router
  .route("/:id")
  .get(protect, getPostById) // Get single post
  .put(protect, updatePost) // Update post (owner only)
  .delete(protect, deletePost); // Delete post (owner only)

// Interaction routes - all require authentication
router.post("/:id/like", protect, toggleLike); // Toggle like
router.post("/:id/comment", protect, addComment); // Add comment
router.delete("/:id/comment/:commentId", protect, deleteComment); // Delete comment
router.post("/:id/share", protect, sharePost); // Share/repost

module.exports = router;
