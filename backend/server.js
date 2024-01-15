const fastify = require("fastify")({ logger: false });
const db = require("./src/sqlite.js");
const config = require("./config");

// ALLOW CORS FROM ALL ORIGINS
fastify.register(require("@fastify/cors"), {
  origin: "*", // You can set specific origins instead of '*'
  methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Add allowed headers
  exposedHeaders: ["Content-Disposition"], // Add exposed headers if needed
});

fastify.get("/", async (req, reply) => {
  console.log(await db.getServices());
  return reply.send({ status: "ok", msg: "ams backend service api running.." });
});
fastify.get("/ping", async (req, reply) => {
  return reply.send("pong");
});
async function invalidReq(req, reply) {
  return reply.send({ status: "error", reason: "api service not provided" });
}
fastify.get("/api", invalidReq);
fastify.get("/api/", invalidReq);

const {
  imageUploadAccess,
  logImageUpload,
  updateServiceData,
} = require("./routes/device.route");
const {
  getUsers,
  getServices,
  createService,
  createAdmin,
} = require("./routes/admin.route");
const {
  getUser,
  createUser,
  userServices,
  serviceItem,
} = require("./routes/user.route");

// DEVICE
fastify.post("/api/image-upload", imageUploadAccess);
fastify.post("/api/log-image-upload", logImageUpload);
fastify.post("/api/update-service-data", updateServiceData);

// USER
fastify.get("/api/users/:userId", getUser);
fastify.get("/api/users/:userId/services", userServices);
fastify.get("/api/services/:serviceId", serviceItem);
fastify.post("/api/users", createUser);

// ADMIN
fastify.get("/api/users", getUsers);
fastify.get("/api/services", getServices);
fastify.post("/api/services", createService);
fastify.post("/api/admin", createAdmin);

// VERIFICATION/CONFIRMATION SYSTEM REQUIRED
fastify.get("/api/account", async (req, reply) => {
  return reply.send({ status: "ok", data: await db.getAccounts() });
});
fastify.post("/api/account", async (req, reply) => {
  const { userId, serviceId } = req.body;
  if (!userId || !serviceId) {
    return reply.send({
      status: "error",
      reason: "userId or serviceId not provided",
    });
  }
  await db.createAccount(userId, serviceId);
  return reply.send({ status: "ok" });
});

fastify.listen(
  { port: config.PORT, host: config.HOST },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server is running.. ", address);
  }
);
