import { useState } from "react";
import { X, Copy, Share2, Check } from "lucide-react";
import { sharePost } from "../../services/postService";
import Button from "../Button";

export default function ShareModal({ postId, onClose, onShareSuccess }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShareToFeed = async () => {
    setLoading(true);
    try {
      const response = await sharePost(postId, content);
      onShareSuccess(response.data);
      onClose();
    } catch (err) {
      alert(err.message || "Failed to share");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-600 dark:text-gray-400" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Share this post</h3>

        {/* Share to feed */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add a comment (optional)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={2}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white outline-none text-gray-900 dark:text-white resize-none"
            disabled={loading}
          />
        </div>

        <Button
          onClick={handleShareToFeed}
          variant="primary"
          size="md"
          className="w-full mb-3"
          loading={loading}
          disabled={loading}
        >
          <Share2 size={18} className="mr-2" />
          Share to Feed
        </Button>

        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">or</span>
          </div>
        </div>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="md"
          className="w-full"
        >
          {copied ? (
            <>
              <Check size={18} className="mr-2" /> Copied!
            </>
          ) : (
            <>
              <Copy size={18} className="mr-2" /> Copy link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
