import { useState, useContext } from "react";
import { Image, Video, FileText, X, Loader2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { createPost } from "../../services/postService";
import Avatar from "../Avatar";
import Button from "../Button";

export default function CreatePostCard({ onPostCreated }) {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + mediaFiles.length > 10) {
      setError("Maximum 10 files allowed");
      return;
    }

    // Validate file types and sizes
    const validFiles = [];
    const previews = [];

    files.forEach((file) => {
      if (file.size > 50 * 1024 * 1024) {
        setError(`${file.name} is too large. Max 50MB per file.`);
        return;
      }

      validFiles.push(file);

      // Create preview for images and videos
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push({ type: "image", url: reader.result, name: file.name });
          if (previews.length === validFiles.length) {
            setMediaPreviews([...mediaPreviews, ...previews]);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        previews.push({ type: "video", url: URL.createObjectURL(file), name: file.name });
        if (previews.length === validFiles.length) {
          setMediaPreviews([...mediaPreviews, ...previews]);
        }
      } else {
        previews.push({ type: "document", url: null, name: file.name });
        if (previews.length === validFiles.length) {
          setMediaPreviews([...mediaPreviews, ...previews]);
        }
      }
    });

    setMediaFiles([...mediaFiles, ...validFiles]);
  };

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    setMediaPreviews(mediaPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && mediaFiles.length === 0) {
      setError("Post must have either content or media");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("visibility", visibility);

      mediaFiles.forEach((file) => {
        formData.append("media", file);
      });

      const response = await createPost(formData);
      
      // Reset form
      setContent("");
      setMediaFiles([]);
      setMediaPreviews([]);
      setVisibility("public");
      
      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit}>
        {/* User Avatar and Input */}
        <div className="flex gap-3">
          <Avatar
            src={user?.avatar}
            alt={user?.fullName}
            size="md"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
              rows={content || mediaFiles.length > 0 ? 4 : 2}
              disabled={loading}
            />
          </div>
        </div>

        {/* Media Previews */}
        {mediaPreviews.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {mediaPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                {preview.type === "image" && (
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                {preview.type === "video" && (
                  <video
                    src={preview.url}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                {preview.type === "document" && (
                  <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center">
                    <FileText size={32} className="text-gray-400 mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 px-2 truncate w-full text-center">
                      {preview.name}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={loading}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Actions Bar */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex gap-2">
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleMediaSelect}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Image size={20} className="text-green-600" />
            </label>

            <input
              type="file"
              id="video-upload"
              multiple
              accept="video/*"
              onChange={handleMediaSelect}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Video size={20} className="text-red-600" />
            </label>

            <input
              type="file"
              id="document-upload"
              multiple
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              onChange={handleMediaSelect}
              className="hidden"
              disabled={loading}
            />
            <label
              htmlFor="document-upload"
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FileText size={20} className="text-blue-600" />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              disabled={loading}
            >
              <option value="public">Public</option>
              <option value="university-only">University Only</option>
            </select>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading || (!content.trim() && mediaFiles.length === 0)}
              loading={loading}
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
