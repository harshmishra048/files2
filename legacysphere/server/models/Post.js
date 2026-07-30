const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      trim: true,
      maxlength: [5000, "Post content cannot exceed 5000 characters"],
    },

    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["image", "video", "document"],
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    shares: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        sharedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    sharedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    visibility: {
      type: String,
      enum: ["public", "university-only"],
      default: "public",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for like count
postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Virtual for comment count
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Virtual for share count
postSchema.virtual("shareCount").get(function () {
  return this.shares.length;
});

// Indexes for performance
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ visibility: 1 });
postSchema.index({ sharedFrom: 1 });

// Validation: ensure at least content or media exists
postSchema.pre("validate", function () {
  if (
    !this.content &&
    (!this.media || this.media.length === 0) &&
    !this.sharedFrom
  ) {
    throw new Error("Post must have either content or media");
  }
});

module.exports = mongoose.model("Post", postSchema);
