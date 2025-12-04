const db = require("../database/connection");

class Message {
  static async create({ request_id, sender, message }) {
    const result = await db.run(
      `
      INSERT INTO messages (request_id, sender, message)
      VALUES (?, ?, ?)
    `,
      [request_id, sender, message]
    );

    return this.findById(result.lastID);
  }

  static async findById(id) {
    return await db.get("SELECT * FROM messages WHERE id = ?", [id]);
  }

  static async findByRequestId(request_id) {
    return await db.all(
      "SELECT * FROM messages WHERE request_id = ? ORDER BY created_at ASC",
      [request_id]
    );
  }

  static async delete(id) {
    await db.run("DELETE FROM messages WHERE id = ?", [id]);
    return true;
  }

  static async deleteByRequestId(request_id) {
    await db.run("DELETE FROM messages WHERE request_id = ?", [request_id]);
    return true;
  }
}

module.exports = Message;
