import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";
import Avatar from "../components/Avatar";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const response = await getPosts(1, 50);
        const ownPosts = (response.data || []).filter(
          (post) => post.author?._id === user?._id
        );
        if (isMounted) setPosts(ownPosts);
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load posts");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (user?._id) fetchUserPosts();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3">
            <Link
              to="/home"
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile
            </h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Profile header card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <Avatar src={user?.avatar} alt={user?.fullName} size="xl" />

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {user?.fullName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {user?.role}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {user?.university}
                {user?.department ? ` · ${user.department}` : ""}
              </p>
              {user?.bio && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                  {user.bio}
                </p>
              )}

              <div className="flex justify-center sm:justify-start gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <span className="block font-semibold text-gray-900 dark:text-white">
                    {posts.length}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Posts
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-gray-900 dark:text-white">
                    0
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Connections
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's posts */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Posts
          </h3>

          {loading && (
            <div className="flex justify-center py-10 text-gray-500 dark:text-gray-400">
              <Loader2 className="animate-spin" size={24} />
            </div>
          )}

          {!loading && error && (
            <div className="text-sm text-red-600 dark:text-red-400 py-4">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-10">
              No posts yet.
            </div>
          )}

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4"
              >
                {post.content && (
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                    {post.content}
                  </p>
                )}

                {post.media?.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {post.media.map((m, i) => (
                      <div key={i}>
                        {m.type === "image" && (
                          <img
                            src={m.url}
                            alt=""
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )}
                        {m.type === "video" && (
                          <video
                            src={m.url}
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                          />
                        )}
                        {m.type === "document" && (
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 px-2 text-center"
                          >
                            {m.filename}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Heart size={16} /> {post.likeCount ?? post.likes?.length ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={16} />{" "}
                    {post.commentCount ?? post.comments?.length ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Share2 size={16} /> {post.shareCount ?? post.shares?.length ?? 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}