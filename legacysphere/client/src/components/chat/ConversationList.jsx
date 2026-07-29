import { useState } from "react";
import { Search, Edit } from "lucide-react";
import Avatar from "../Avatar";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

export default function ConversationList({
  conversations,
  activeConversation,
  onSelect,
  onNewConversation,
}) {
  const { user } = useAuth();
  const { onlineUsers } = useSocket();
  const [search, setSearch] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newUserId, setNewUserId] = useState("");

  const getOtherParticipant = (conv) => {
    return conv.participants.find(
      (p) => p._id?.toString() !== user?._id?.toString()
    );
  };

  const filtered = conversations.filter((conv) => {
    const other = getOtherParticipant(conv);
    return other?.fullName?.toLowerCase().includes(search.toLowerCase());
  });

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "Now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const handleStartChat = () => {
    if (!newUserId.trim()) return;
    onNewConversation(newUserId.trim());
    setNewUserId("");
    setShowNewChat(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
          <button
            onClick={() => setShowNewChat(!showNewChat)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="New conversation"
          >
            <Edit size={18} />
          </button>
        </div>

        {/* New Chat Input */}
        {showNewChat && (
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
              placeholder="Paste user ID to start chat..."
              className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-900 dark:text-white"
            />
            <button
              onClick={handleStartChat}
              className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
            >
              Start
            </button>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1">Click ✏️ to start a new chat</p>
          </div>
        ) : (
          filtered.map((conv) => {
            const other = getOtherParticipant(conv);
            const isOnline = onlineUsers[other?._id?.toString()] || false;
            const isActive = activeConversation?._id === conv._id;

            return (
              <div
                key={conv._id}
                onClick={() => onSelect(conv)}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
              >
                {/* Avatar with online dot */}
                <div className="relative flex-shrink-0">
                  <Avatar src={other?.avatar} alt={other?.fullName} size="md" />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                      isOnline ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                </div>

                {/* Name + last message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {other?.fullName}
                    </p>
                    {conv.lastMessage && (
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-1">
                        {formatTime(conv.updatedAt)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {conv.lastMessage
                      ? `${conv.lastMessage.sender?.fullName === user?.fullName ? "You: " : ""}${conv.lastMessage.content}`
                      : "No messages yet"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
