const config = require("../config.js");
const db = require("../src/sqlite.js");
// const fs = require("fs");
// const util = require("util");
// const { pipeline } = require("stream");
// const pump = util.promisify(pipeline);

async function imageUploadAccess(req, reply) {
  const { isSimulator, serviceId } = req.body;

  if (!serviceId && !isSimulator) {
    return reply.send({ status: "error", reason: "serviceId not provided" });
  }
  if (!isSimulator) {
    const allowed = await db.serviceIsBlocked(body.serviceId);
    if (!allowed) {
      return reply.send({ status: "error", reason: "serviceId is blocked" });
    }
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

async function updateServiceData(req, reply) {
  const { serviceId, temperature, humidity } = req.body;
  if (!serviceId) {
    return reply.send({ status: "error", reason: "serviceId is not provided" });
  }

  const data = JSON.parse((await db.getServices(serviceId)).data);
  data.temperature = temperature ? temperature : data.temperature;
  data.humidity = humidity ? humidity : data.humidity;

  await db.updateServiceData(serviceId, data);
  return reply.send({ status: "ok" });
}

module.exports = { imageUploadAccess, logImageUpload, updateServiceData };
