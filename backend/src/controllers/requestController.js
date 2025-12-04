const Request = require("../models/Request");
const Notification = require("../models/Notification");

const requestController = {
  async create(req, res, next) {
    try {
      const { type, description, unit, address } = req.body;

      // Generate request ID
      const timestamp = Date.now();
      const id = `REQ-${timestamp}`;

      const request = await Request.create({
        id,
        user_id: req.user.id,
        type,
        description,
        unit,
        address,
        priority: "Medium",
        status: "pending",
      });

      // Create notification for admins (simplified - in production, notify all admins)
      // This would need improvement to notify all admin users

      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const filters = {};

      // Homeowners can only see their own requests
      if (req.user.role === "homeowner") {
        filters.user_id = req.user.id;
      }

      // Apply query filters
      if (req.query.status) filters.status = req.query.status;
      if (req.query.type) filters.type = req.query.type;
      if (req.query.priority) filters.priority = req.query.priority;

      const requests = await Request.findAll(filters);
      res.json(requests);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Check authorization
      if (req.user.role === "homeowner" && request.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      res.json(request);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Only admins can update requests
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const updateData = {};
      const allowedFields = [
        "priority",
        "status",
        "assigned_technician",
        "technician_notes",
        "completion_notes",
        "completed_date",
      ];

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      const updatedRequest = await Request.update(req.params.id, updateData);

      // Create notification for homeowner
      await Notification.create({
        user_id: request.user_id,
        type: "request_update",
        title: "Request Updated",
        message: `Your ${request.type} request has been updated`,
      });

      res.json(updatedRequest);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Check authorization
      if (req.user.role === "homeowner" && request.user_id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      await Request.delete(req.params.id);
      res.json({ message: "Request deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getStats(req, res, next) {
    try {
      // Only admins can view stats
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      const stats = await Request.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = requestController;
