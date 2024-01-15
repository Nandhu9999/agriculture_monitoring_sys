const db = require("../src/sqlite.js");
const { getUniqueId } = require("../config.js");

async function getUsers(req, reply) {
  const dbResponse = await db.getUsers();
  if (dbResponse.dbStatus == "success") {
    return reply.send({ status: "ok", users: dbResponse.data });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}
async function getServices(req, reply) {
  const dbResponse = await db.getServices();
  if (dbResponse.dbStatus == "success") {
    return reply.send({ status: "ok", services: dbResponse.data });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}

async function createService(req, reply) {
  const { serialNo } = req.body;
  if (!serialNo) {
    return reply.send({ status: "error", reason: "serialNo not provided" });
  }
  const uniqueId = getUniqueId();
  const dbResponse = await db.createService(uniqueId, serialNo);
  if (dbResponse.dbStatus == "success") {
    return reply.send({ status: "ok", services: dbResponse.data });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}

async function createAdmin(req, reply) {
  const { email } = req.body;
  if (!email) {
    return reply.send({ status: "error", reason: "email not provided" });
  }

  const userName = email.split("@")[0];
  const userId = getUniqueId();

  const dbResponse = await db.createUser(userId, userName, email, 1); // isAdmin = 1
  if (dbResponse.dbStatus == "success") {
    return reply.send({ status: "ok", msg: dbResponse.data });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}

module.exports = { getUsers, getServices, createService, createAdmin };
