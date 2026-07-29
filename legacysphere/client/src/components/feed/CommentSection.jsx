import { useState, useContext } from "react";
import { Send, Trash2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { addComment, deleteComment } from "../../services/postService";
import Avatar from "../Avatar";

export default function CommentSection({ postId, comments, onCommentAdded, onCommentDeleted }) {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [localComments, setLocalComments] = useState(comments || []);

  const formatCommentContent = (text) => {
    // Simple regex to detect @username (letters, numbers, underscore, dot)
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-600 dark:text-blue-400 font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await addComment(postId, commentText.trim());
      
      // Add new comment to local state
      setLocalComments([...localComments, response.data]);
      setCommentText("");
      
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    setDeletingCommentId(commentId);
    try {
      await deleteComment(postId, commentId);
      
      // Remove comment from local state
      setLocalComments(localComments.filter(c => c._id !== commentId));
      
      if (onCommentDeleted) {
        onCommentDeleted();
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="flex gap-2 mb-4">
        <Avatar
          src={user?.avatar}
          alt={user?.fullName}
          size="sm"
        />
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            maxLength={500}
            className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !commentText.trim()}
            className="p-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {localComments.length === 0 ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          localComments.map((comment) => (
            <div key={comment._id} className="flex gap-2 group">
              <Avatar
                src={comment.author?.avatar}
                alt={comment.author?.fullName}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl px-4 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {comment.author?.fullName}
                    </h4>
                    {user?._id?.toString() === comment.author?._id?.toString() && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        disabled={deletingCommentId === comment._id}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                        title="Delete comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5 break-words">
                    {formatCommentContent(comment.content)}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 px-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                  {comment.likes && comment.likes.length > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.likes.length} {comment.likes.length === 1 ? "like" : "likes"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Character Count */}
      {commentText && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          {commentText.length}/500
        </div>
      )}
    </div>
  );
}
