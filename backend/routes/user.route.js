const db = require("../src/sqlite.js");
const { getUniqueId } = require("../config.js");

async function getUser(req, reply) {
  const { userId } = req.params;
  const dbResponse = await db.getUsers(userId);
  if (dbResponse.dbStatus == "success") {
    return reply.send({ status: "ok", user: dbResponse.data[0] });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}
async function createUser(req, reply) {
  const { email, profileName } = req.body;
  if (!email && email.indexOf("@") != -1) {
    return reply.send({ status: "error", reason: "email not provided" });
  }

  const userName = profileName || email.split("@")[0];
  const userId = getUniqueId();
  const dbResponse = await db.createUser(userId, userName, email);
  if (dbResponse.dbStatus == "success") {
    return reply.send({ status: "ok", msg: dbResponse.data });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}

async function userServices(req, reply) {
  const { userId } = req.params;
  if (!userId) {
    return reply.send({ status: "error", reason: "userId not provided" });
  }
  // const services = [
  //   { serviceId: 1, url: "/services/1", name: "asdf1" },
  //   { serviceId: 2, url: "/services/2", name: "asdf2" },
  // ];
  const dbResponse = await db.getUserServices(userId);
  if (dbResponse.dbStatus == "success") {
    dbResponse.data.map((item) => {
      item.url = "/services/" + item.serviceId;
      item.name = item.serviceId.substr(0, 5);
    });
    return reply.send({ status: "ok", services: dbResponse.data });
  } else {
    return reply.send({ status: "error", reason: dbResponse.dbError });
  }
}

async function serviceItem(req, reply) {
  const { serviceId } = req.params;

  if (!serviceId) {
    return reply.send({ status: "error", reason: "serviceId not provided" });
  }

  const values = {
    image: {},
    temperature: {},
    humidity: {},
    battery: {},
    location: {},
    controls: {},
  };

  return reply.send({ status: "ok", serviceId, values });
}
module.exports = { getUser, createUser, userServices, serviceItem };
