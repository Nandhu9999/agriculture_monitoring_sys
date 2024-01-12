const config = require("../config.js");
const db = require("../src/sqlite.js");
// const fs = require("fs");
// const util = require("util");
// const { pipeline } = require("stream");
// const pump = util.promisify(pipeline);

async function imageUploadAccess(req, reply) {
  const { serviceId } = req.body;
  if (!serviceId) {
    return reply.send({ status: "error", reason: "serviceId not provided" });
  }
  const allowed = await db.serviceIsBlocked(body.serviceId);
  if (!allowed) {
    return reply.send({ status: "error", reason: "serviceId is blocked" });
  }

  return reply.send({ status: "ok", uploadURL: config.DISCORD_WEBHOOK_API });
}

async function logImageUpload(req, reply) {
  const { serviceId, imageURL } = req.body;
  if (!serviceId || !imageURL) {
    return reply.send({
      status: "error",
      reason: "serviceId or imageURL is not provided",
    });
  }
  await db.serviceLogUploadImage(serviceId, imageURL);
  return reply.send({ status: "ok" });
}

module.exports = { imageUploadAccess, logImageUpload };
