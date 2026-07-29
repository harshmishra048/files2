import { useState, useEffect, useRef } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Avatar from "../Avatar";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversation }) {
  const { user } = useAuth();
  const { socket, onlineUsers } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [typingUsers, setTypingUsers] = useState({});
  const [readReceipts, setReadReceipts] = useState({});
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const prevScrollHeightRef = useRef(0);

  const otherParticipant = conversation.participants.find(
    (p) => p._id?.toString() !== user?._id?.toString()
  );
  const isOnline = onlineUsers[otherParticipant?._id?.toString()] || false;

  const scrollToBottom = (smooth = true) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: smooth ? "smooth" : "instant",
      });
    }, 80);
  };

  const fetchMessages = async (pageNum = 1, append = false) => {
    try {
      const res = await api.get(
        `/conversations/${conversation._id}/messages?page=${pageNum}&limit=20`
      );
      const newMsgs = res.data.data;
      setHasMore(res.data.pagination.hasMore);
      setPage(pageNum);

      if (append) {
        // Save scroll position before prepending
        prevScrollHeightRef.current = containerRef.current?.scrollHeight || 0;
        setMessages((prev) => [...newMsgs, ...prev]);
      } else {
        setMessages(newMsgs);
        scrollToBottom(false);
      }
    } catch (err) {
      console.error("fetchMessages error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Restore scroll position after prepending old messages
  useEffect(() => {
    if (prevScrollHeightRef.current && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop = newScrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    }
  }, [messages]);

  // Init: join room, fetch messages
  useEffect(() => {
    if (!conversation) return;
    setMessages([]);
    setLoading(true);
    setPage(1);
    setTypingUsers({});
    setReadReceipts({});
    fetchMessages(1, false);
    socket?.emit("join_conversation", conversation._id);
  }, [conversation._id]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message) => {
      if (message.conversation === conversation._id) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
        // Auto mark as read if we are the receiver
        if (message.sender._id !== user?._id?.toString()) {
          socket.emit("message_read", {
            messageId: message._id,
            conversationId: conversation._id,
          });
        }
      }
    };

    const handleTyping = ({ userId, isTyping }) => {
      if (userId !== user?._id?.toString()) {
        setTypingUsers((prev) => ({ ...prev, [userId]: isTyping }));
      }
    };

    const handleReadReceipt = ({ messageId }) => {
      setReadReceipts((prev) => ({ ...prev, [messageId]: true }));
    };

    socket.on("receive_message", handleReceive);
    socket.on("typing", handleTyping);
    socket.on("read_receipt", handleReadReceipt);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("typing", handleTyping);
      socket.off("read_receipt", handleReadReceipt);
    };
  }, [socket, conversation._id, user?._id]);

  const isOtherTyping = Object.entries(typingUsers).some(
    ([uid, t]) => uid !== user?._id?.toString() && t
  );

  const handleSend = (content) => {
    socket?.emit("send_message", {
      conversationId: conversation._id,
      content,
    });
  };

  const handleTyping = (isTyping) => {
    socket?.emit("typing", {
      conversationId: conversation._id,
      isTyping,
    });
  };

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="relative">
          <Avatar src={otherParticipant?.avatar} alt={otherParticipant?.fullName} size="md" />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
              isOnline ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {otherParticipant?.fullName}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isOtherTyping ? (
              <span className="text-green-600 dark:text-green-400">Typing...</span>
            ) : isOnline ? (
              "Online"
            ) : (
              "Offline"
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 dark:bg-gray-950"
      >
        {hasMore && (
          <button
            onClick={() => fetchMessages(page + 1, true)}
            className="w-full text-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 py-2"
          >
            Load older messages
          </button>
        )}

        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No messages yet. Say hello! 👋
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isOwn = msg.sender?._id?.toString() === user?._id?.toString() ||
                          msg.sender === user?._id?.toString();
            const isRead = readReceipts[msg._id];
            const showAvatar =
              !isOwn &&
              (i === 0 || messages[i - 1]?.sender?._id !== msg.sender?._id);

            return (
              <div
                key={msg._id}
                className={`flex items-end gap-2 ${isOwn ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar for receiver */}
                {!isOwn && (
                  <div className="w-7 flex-shrink-0">
                    {showAvatar && (
                      <Avatar
                        src={msg.sender?.avatar}
                        alt={msg.sender?.fullName}
                        size="xs"
                      />
                    )}
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm break-words ${
                      isOwn
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-br-sm"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`flex items-center gap-1 mt-0.5 ${isOwn ? "justify-end" : ""}`}>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {formatTime(msg.createdAt)}
                    </span>
                    {isOwn && (
                      <span className="text-[10px] text-gray-400">
                        {isRead ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {isOtherTyping && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-7" />
            <div className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} onTyping={handleTyping} />
    </div>
  );
}
