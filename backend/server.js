const fastify = require("fastify")({ logger: false });
const db = require("./src/sqlite.js");
const config = require("./config");

fastify.get("/", async (req, reply) => {
  const totalServices = await db.allServices();
  console.log(totalServices);

  return reply.send("ams backend service api running..");
});

const {} = require("./routes/device.route");
const { createService } = require("./routes/admin.route");
const { createUser } = require("./routes/user.route");

// DEVICE
// fastify.get("/api/");

// ADMIN
fastify.get("/api/createService", createService);

// USER
fastify.get("/api/createUser", createUser);

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
