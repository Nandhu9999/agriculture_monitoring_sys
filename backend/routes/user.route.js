const crypto = require("crypto");
const db = require("../src/sqlite.js");

async function createUser(req, reply) {
  const { email } = req.body;
  if (!email) {
    return reply.send({ status: "error", reason: "email not provided" });
  }

  const userName = email.split("@")[0];
  const userId = crypto.randomBytes(16).toString("hex");

  const response = await db.createUser(userId, userName, email);
  console.log(response);
  return reply.send({ status: "ok" });
}

module.exports = { createUser };
