require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = require("./app");
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const Notification = require("./models/Notification");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.io JWT authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error: No token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return next(new Error("Authentication error: User not found"));

    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

// Track online users: userId -> socketId
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.user._id.toString();
  userSocketMap[userId] = socket.id;

  console.log(`✅ User connected: ${socket.user.fullName} (${socket.id})`);

  // Broadcast this user as online to everyone
  io.emit("user_online", { userId });

  // Join a conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });

  // Send message
  socket.on("send_message", async (data) => {
    try {
      const { conversationId, content } = data;

      if (!content || !content.trim()) return;

      const conversation = await Conversation.findById(conversationId);
      if (!conversation) return;

      // Verify user is a participant
      const isParticipant = conversation.participants.some(
        (p) => p.toString() === userId
      );
      if (!isParticipant) return;

      // Save message to DB
      const message = await Message.create({
        conversation: conversationId,
        sender: userId,
        content: content.trim(),
        readBy: [userId],
      });

      await message.populate("sender", "fullName avatar");

      // Update conversation's lastMessage + updatedAt
      conversation.lastMessage = message._id;
      conversation.updatedAt = new Date();
      await conversation.save();

      // Emit message to everyone in the room
      io.to(conversationId).emit("receive_message", message);

      // Notify other participants if they are not in the room
      const otherParticipants = conversation.participants.filter(
        (p) => p.toString() !== userId
      );

      for (const participantId of otherParticipants) {
        const pid = participantId.toString();

        // Create DB notification
        try {
          await Notification.create({
            recipient: participantId,
            sender: userId,
            type: "message",
          });
        } catch (e) {
          // skip duplicate notification errors silently
        }

        // Push socket notification if they are online
        const targetSocketId = userSocketMap[pid];
        if (targetSocketId) {
          io.to(targetSocketId).emit("new_message_notification", {
            conversationId,
            sender: { _id: userId, fullName: socket.user.fullName, avatar: socket.user.avatar },
            content: content.trim(),
          });
        }
      }
    } catch (err) {
      console.error("send_message error:", err.message);
    }
  });

  // Typing indicator
  socket.on("typing", ({ conversationId, isTyping }) => {
    socket.to(conversationId).emit("typing", { userId, isTyping });
  });

  // Message read receipt
  socket.on("message_read", async ({ messageId, conversationId }) => {
    try {
      const message = await Message.findById(messageId);
      if (!message) return;

      if (!message.readBy.map((id) => id.toString()).includes(userId)) {
        message.readBy.push(userId);
        await message.save();

        io.to(conversationId).emit("read_receipt", { messageId, userId });
      }
    } catch (err) {
      console.error("message_read error:", err.message);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("user_offline", { userId });
    console.log(`❌ User disconnected: ${socket.user.fullName} (${socket.id})`);
  });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(process.env.PORT, () => {
      console.log(`Server Running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Handle port already in use gracefully
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${process.env.PORT} is already in use.`);
    console.error(`   Stop the other process or change PORT in .env`);
    process.exit(1);
  } else {
    throw err;
  }
});
