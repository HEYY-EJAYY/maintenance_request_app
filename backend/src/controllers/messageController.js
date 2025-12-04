const Message = require("../models/Message");
const Request = require("../models/Request");
const Notification = require("../models/Notification");

const messageController = {
  async create(req, res, next) {
    try {
      const { request_id, message } = req.body;

      // Verify request exists
      const request = await Request.findById(request_id);
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Check authorization
      if (req.user.role === "homeowner" && request.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const newMessage = await Message.create({
        request_id,
        sender: req.user.role,
        message,
      });

      // Create notification for the other party
      if (req.user.role === "admin") {
        // Notify homeowner
        await Notification.create({
          user_id: request.user_id,
          type: "new_message",
          title: "New Message",
          message: "Admin replied to your request",
        });
      } else {
        // Notify admin (simplified - in production, notify assigned admin)
        // This would need improvement to notify the correct admin user
      }

      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  },

  async getByRequestId(req, res, next) {
    try {
      const request = await Request.findById(req.params.request_id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Check authorization
      if (req.user.role === "homeowner" && request.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const messages = await Message.findByRequestId(req.params.request_id);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = messageController;
