const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const { getMediaType } = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content, visibility } = req.body;
    const userId = req.user._id;

    // Validate: must have content or files
    if (!content && (!req.files || req.files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Post must have either content or media",
      });
    }

    // Process uploaded media files
    const media = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        media.push({
          url: `/uploads/${file.filename}`,
          type: getMediaType(file.mimetype),
          filename: file.filename,
        });
      });
    }

    // Create post
    const post = await Post.create({
      author: userId,
      content: content || "",
      media,
      visibility: visibility || "public",
    });

    // Populate author details
    await post.populate({
      path: "author",
      select: "fullName avatar role university department",
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create post",
    });
  }
};

// @desc    Get paginated feed
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query based on visibility and user's university
    const query = {};
    
    // If visibility filter is provided
    if (req.query.visibility) {
      query.visibility = req.query.visibility;
    }

    // Count total documents
    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
        select: "fullName avatar role university department",
      })
      .populate({
        path: "sharedFrom",
        populate: {
          path: "author",
          select: "fullName avatar role university department",
        },
      })
      .populate({
        path: "comments",
        options: { limit: 3, sort: { createdAt: -1 } },
        populate: {
          path: "author",
          select: "fullName avatar",
        },
      });

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasMore: page < totalPages,
        limit,
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch posts",
    });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Private
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: "author",
        select: "fullName avatar role university department",
      })
      .populate({
        path: "sharedFrom",
        populate: {
          path: "author",
          select: "fullName avatar role university department",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "fullName avatar",
        },
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch post",
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private (owner only)
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    // Update allowed fields
    const { content, visibility } = req.body;
    if (content !== undefined) post.content = content;
    if (visibility !== undefined) post.visibility = visibility;

    await post.save();

    await post.populate({
      path: "author",
      select: "fullName avatar role university department",
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update post",
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private (owner only)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    // Delete associated media files
    if (post.media && post.media.length > 0) {
      post.media.forEach((mediaItem) => {
        const filePath = path.join(__dirname, "..", mediaItem.url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    // Delete all comments associated with this post
    await Comment.deleteMany({ post: post._id });

    // Delete the post
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete post",
    });
  }
};

// @desc    Toggle like on post
// @route   POST /api/posts/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike: remove user from likes array
      post.likes.splice(likeIndex, 1);
    } else {
      // Like: add user to likes array
      post.likes.push(userId);
      
      // Create notification if liking someone else's post
      if (post.author.toString() !== userId.toString()) {
        await Notification.create({
          recipient: post.author,
          sender: userId,
          type: "like",
          post: post._id,
        });
      }
    }

    await post.save();

    res.status(200).json({
      success: true,
      data: {
        liked: likeIndex === -1,
        likeCount: post.likes.length,
      },
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle like",
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Create comment
    const comment = await Comment.create({
      post: post._id,
      author: req.user._id,
      content,
    });

    // Add comment reference to post
    post.comments.push(comment._id);
    await post.save();

    // Create notification if commenting on someone else's post
    if (post.author.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: post.author,
        sender: req.user._id,
        type: "comment",
        post: post._id,
      });
    }

    // Populate comment author
    await comment.populate({
      path: "author",
      select: "fullName avatar",
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add comment",
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/posts/:id/comment/:commentId
// @access  Private (comment owner only)
const deleteComment = async (req, res) => {
  try {
    const { id: postId, commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Check ownership
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
    }

    // Remove comment reference from post
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    // Delete comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete comment",
    });
  }
};

// @desc    Share/repost a post
// @route   POST /api/posts/:id/share
// @access  Private
const sharePost = async (req, res) => {
  try {
    const originalPost = await Post.findById(req.params.id);

    if (!originalPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id;

    // Check if user already shared this post
    const alreadyShared = originalPost.shares.some(
      (share) => share.user.toString() === userId.toString()
    );

    if (alreadyShared) {
      return res.status(400).json({
        success: false,
        message: "You have already shared this post",
      });
    }

    // Add user to shares array in original post
    originalPost.shares.push({
      user: userId,
      sharedAt: new Date(),
    });
    await originalPost.save();

    // Create notification if sharing someone else's post
    if (originalPost.author.toString() !== userId.toString()) {
      await Notification.create({
        recipient: originalPost.author,
        sender: userId,
        type: "share",
        post: originalPost._id,
      });
    }

    // Create a new post with sharedFrom reference
    const { content } = req.body; // Optional comment when sharing

    const sharedPost = await Post.create({
      author: userId,
      content: content || "",
      sharedFrom: originalPost._id,
      visibility: originalPost.visibility,
    });

    await sharedPost.populate([
      {
        path: "author",
        select: "fullName avatar role university department",
      },
      {
        path: "sharedFrom",
        populate: {
          path: "author",
          select: "fullName avatar role university department",
        },
      },
    ]);

    res.status(201).json({
      success: true,
      data: sharedPost,
    });
  } catch (error) {
    console.error("Share post error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to share post",
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
  sharePost,
};
