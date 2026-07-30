import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Moon, Sun, MessageSquare, User as UserIcon } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import CreatePostCard from "../components/feed/CreatePostCard";
import FeedList from "../components/feed/FeedList";
import Avatar from "../components/Avatar";
import NotificationDropdown from "../components/nav/NotificationDropdown";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState(null);

  // Initialize dark mode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const handlePostCreated = (post) => {
    setNewPost(post);
    // Reset after FeedList processes it
    setTimeout(() => setNewPost(null), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Legacy<span className="text-gray-600 dark:text-gray-400">Sphere</span>
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <NotificationDropdown />

              {/* Messages */}
              <Link
                to="/messages"
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Messages"
              >
                <MessageSquare size={20} />
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Profile"
              >
                <UserIcon size={20} />
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-2">
                <Avatar
                  src={user?.avatar}
                  alt={user?.fullName}
                  size="sm"
                  className="cursor-pointer"
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - User Profile (Hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <Link to="/profile" className="flex flex-col items-center text-center group">
                <Avatar
                  src={user?.avatar}
                  alt={user?.fullName}
                  size="xl"
                  className="mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:underline">
                  {user?.fullName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user?.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {user?.university}
                </p>
                {user?.department && (
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {user?.department}
                  </p>
                )}
                {user?.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {user?.bio}
                  </p>
                )}
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Posts</span>
                    <span className="font-semibold text-gray-900 dark:text-white">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Connections</span>
                    <span className="font-semibold text-gray-900 dark:text-white">0</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Center Feed */}
          <main className="lg:col-span-6 space-y-6">
            {/* Create Post Card */}
            <CreatePostCard onPostCreated={handlePostCreated} />

            {/* Feed List */}
            <FeedList newPost={newPost} />
          </main>

          {/* Right Sidebar - Suggestions (Hidden on mobile and tablet) */}
          <aside className="hidden xl:block lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Suggestions
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar size="sm" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Suggested User
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Student
                    </p>
                  </div>
                  <button className="text-xs font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                    Follow
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Trending Topics
                </h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">#AcademicLife</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">245 posts</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">#Research</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">189 posts</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">#StudentLife</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">156 posts</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; 2026 LegacySphere. Connecting academic communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}