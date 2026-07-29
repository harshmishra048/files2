const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getConversations,
  getMessages,
  startConversation,
} = require("../controllers/conversationController");

router.get("/", protect, getConversations);
router.get("/:id/messages", protect, getMessages);
router.post("/", protect, startConversation);

module.exports = router;
