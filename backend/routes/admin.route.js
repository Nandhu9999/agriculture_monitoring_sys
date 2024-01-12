const crypto = require("crypto");

async function createService(req, reply) {
  const body = req.body;
  if (!body.serialNo) {
    return reply.send({ status: "error", reason: "serialNo not provided" });
  }
  try {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    await db.createService(uniqueId, body.serialNo);
    return reply.send({ status: "ok" });
  } catch (err) {
    console.error(err);
    return reply.send({ status: "error", reason: err });
  }
}

module.exports = { createService };
