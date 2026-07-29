import { useState, useContext } from "react";
import { Heart, MessageCircle, Share2, MoreVertical, Trash2, FileText } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { toggleLike, deletePost } from "../../services/postService";
import Avatar from "../Avatar";
import CommentSection from "./CommentSection";
import ShareModal from "./ShareModal";
import Lightbox from "../Lightbox";

const BASE_URL = "http://localhost:5002";

export default function PostCard({ post, onPostDeleted, onPostUpdated }) {
  const { user } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  const checkIfLiked = () => {
    if (!user || !post.likes) return false;
    return post.likes.some(
      (id) =>
        id?.toString() === user._id?.toString() ||
        id?._id?.toString() === user._id?.toString()
    );
  };

  const [isLiked, setIsLiked] = useState(checkIfLiked());
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?._id?.toString() === post.author?._id?.toString();
  const isSharedPost = !!post.sharedFrom;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short", day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const handleLike = async () => {
    const prevLiked = isLiked;
    const prevCount = likeCount;
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    try {
      await toggleLike(post._id);
    } catch {
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    setIsDeleting(true);
    setShowMenu(false);
    try {
      await deletePost(post._id);
      if (onPostDeleted) onPostDeleted(post._id);
    } catch (e) {
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const openLightbox = (images, index) => {
    setLightbox({ open: true, images, index });
  };

  const renderMedia = (media, isNested = false) => {
    if (!media || media.length === 0) return null;

    const imageUrls = media
      .filter((m) => m.type === "image")
      .map((m) => (m.url.startsWith("http") ? m.url : `${BASE_URL}${m.url}`));

    return (
      <div className={`mt-3 ${media.length > 1 ? "grid grid-cols-2 gap-2" : ""}`}>
        {media.map((item, i) => {
          const mediaUrl = item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`;

          if (item.type === "image") {
            return (
              <img
                key={i}
                src={mediaUrl}
                alt="Post media"
                onClick={() => openLightbox(imageUrls, imageUrls.indexOf(mediaUrl))}
                className="w-full rounded-lg object-cover cursor-pointer hover:opacity-95 transition-opacity"
                style={{ maxHeight: isNested ? "200px" : "400px" }}
              />
            );
          }
          if (item.type === "video") {
            return (
              <video
                key={i}
                src={mediaUrl}
                controls
                className="w-full rounded-lg"
                style={{ maxHeight: "400px" }}
              />
            );
          }
          if (item.type === "document") {
            return (
              <a
                key={i}
                href={mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FileText size={24} className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {item.filename}
                </span>
              </a>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderSharedPost = () => {
    if (!isSharedPost || !post.sharedFrom) return null;
    const orig = post.sharedFrom;
    return (
      <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <Avatar src={orig.author?.avatar} alt={orig.author?.fullName} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                {orig.author?.fullName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(orig.createdAt)}
              </span>
            </div>
            {orig.content && (
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {orig.content}
              </p>
            )}
            {renderMedia(orig.media, true)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar src={post.author?.avatar} alt={post.author?.fullName} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {post.author?.fullName}
                </h3>
                {isSharedPost && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">shared a post</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                {post.author?.role && <span className="capitalize">{post.author.role}</span>}
                {post.author?.university && (
                  <><span>•</span><span>{post.author.university}</span></>
                )}
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Owner Menu */}
          {isOwner && (
            <div className="relative flex-shrink-0 ml-2">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <Trash2 size={15} />
                    {isDeleting ? "Deleting..." : "Delete Post"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        {post.content && (
          <p className="mt-3 text-gray-900 dark:text-white whitespace-pre-wrap text-sm leading-relaxed">
            {post.content}
          </p>
        )}

        {/* Media (only for non-shared posts) */}
        {!isSharedPost && renderMedia(post.media)}

        {/* Shared Post embed */}
        {renderSharedPost()}

        {/* Stats bar */}
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-3 flex-wrap">
          <span>
            {likeCount > 0
              ? isLiked
                ? `You${likeCount > 1 ? ` and ${likeCount - 1} other${likeCount - 1 > 1 ? "s" : ""}` : ""} liked this`
                : `${likeCount} ${likeCount === 1 ? "person" : "people"} liked this`
              : "Be the first to like"}
          </span>
          <span className="ml-auto">
            {commentCount} {commentCount === 1 ? "comment" : "comments"} •{" "}
            {post.shares?.length || 0} {post.shares?.length === 1 ? "share" : "shares"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
              isLiked
                ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Heart size={19} fill={isLiked ? "currentColor" : "none"} />
            Like
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <MessageCircle size={19} />
            Comment
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Share2 size={19} />
            Share
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <CommentSection
            postId={post._id}
            comments={post.comments || []}
            onCommentAdded={() => setCommentCount((c) => c + 1)}
            onCommentDeleted={() => setCommentCount((c) => c - 1)}
          />
        )}

        {/* Share Modal */}
        {showShareModal && (
          <ShareModal
            postId={post._id}
            onClose={() => setShowShareModal(false)}
            onShareSuccess={(newPost) => {
              setShowShareModal(false);
              if (onPostUpdated) onPostUpdated(newPost);
            }}
          />
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, images: [], index: 0 })}
          onPrev={() => setLightbox((l) => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length }))}
          onNext={() => setLightbox((l) => ({ ...l, index: (l.index + 1) % l.images.length }))}
        />
      )}
    </>
  );
}
