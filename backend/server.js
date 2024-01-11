const fastify = require("fastify")({ logger: false });

fastify.get("/", async (req, reply) => {
  return reply.send("ams backend service api running..");
});

const {} = require("./routes/device.route");
const {} = require("./routes/user.route");

// DEVICE
fastify.get("/api/");

// USER
fastify.get("/api/");

fastify.listen(
  { port: process.env.PORT || 3000, host: "127.0.0.1" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server is running.. ");
    console.log(address);
  }
);
