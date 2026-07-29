import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Moon, Sun } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import Avatar from "../components/Avatar";
import api from "../services/api";

export default function Messages() {
  const { user, logout } = useContext(AuthContext);
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false); // mobile: show chat or list
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const fetchConversations = async () => {
    try {
      const res = await api.get("/conversations");
      setConversations(res.data.data);
    } catch (err) {
      console.error("fetchConversations error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Listen for incoming messages to update conversation list order
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv._id === message.conversation) {
            return { ...conv, lastMessage: message, updatedAt: new Date() };
          }
          return conv;
        });
        return updated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      });
    };

    socket.on("receive_message", handleNewMessage);
    return () => socket.off("receive_message", handleNewMessage);
  }, [socket]);

  const handleSelectConversation = (conv) => {
    setActiveConversation(conv);
    setShowChat(true); // On mobile, switch to chat view
  };

  const handleNewConversation = async (userId) => {
    try {
      const res = await api.post("/conversations", { userId });
      const newConv = res.data.data;
      // Add to top if not already there
      setConversations((prev) => {
        const exists = prev.find((c) => c._id === newConv._id);
        if (exists) return prev;
        return [newConv, ...prev];
      });
      setActiveConversation(newConv);
      setShowChat(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to start conversation");
    }
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("darkMode", next.toString());
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Legacy<span className="text-gray-500 dark:text-gray-400">Sphere</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Avatar src={user?.avatar} alt={user?.fullName} size="sm" className="cursor-pointer" />
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Conversation List */}
        <div
          className={`
            w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-900 flex-shrink-0 overflow-hidden
            ${showChat ? "hidden md:flex md:flex-col" : "flex flex-col"}
          `}
        >
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ConversationList
              conversations={conversations}
              activeConversation={activeConversation}
              onSelect={handleSelectConversation}
              onNewConversation={handleNewConversation}
            />
          )}
        </div>

        {/* Right Panel: Chat Window */}
        <div
          className={`
            flex-1 overflow-hidden bg-white dark:bg-gray-900
            ${showChat ? "flex flex-col" : "hidden md:flex md:flex-col"}
          `}
        >
          {activeConversation ? (
            <>
              {/* Mobile back button */}
              <div className="md:hidden flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowChat(false)}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">Back to messages</span>
              </div>
              <ChatWindow
                conversation={activeConversation}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-gray-900 dark:text-white font-semibold">Your Messages</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Select a conversation or start a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
