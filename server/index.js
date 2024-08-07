const path = require("path");
const fastify = require("fastify")({ logger: false });
const db = require("./src/mysqldb.js");
// const db2 = require("./src/db/index.js");
const db1 = require("./src/mysqldb.js");
const appConfig = require("./appConfig.js");

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cors"), {
  origin: "*", // You can set specific origins instead of '*'
  /*
    origin: (origin, callback) => {
      const allowedOrigins = ["https://ams.nandhu.site", "https://agri-monitoring-sys.netlify.app"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  */
  methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Add allowed headers
  exposedHeaders: ["Content-Disposition"], // Add exposed headers if needed
});

const UserService = require("./services/User.service");

fastify.addHook("onRequest", (req, reply, next) => {
  const host = req.headers.host.split(":")[0];
  const protocol = req.protocol;
  if (host !== appConfig.HOST && protocol !== "http") {
    reply.redirect("https://" + req.hostname + req.url);
  }

  /*
   * FIREBASE MIDDLEWARE FOR AUTHORIZATION
   */
  if (!req.url.startsWith("/api")) {
    next();
  } else {
    console.log(req.url);
    const token = UserService.getToken(req);
    if (!token) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
    try {
      const decodeValue = UserService.getDecodedToken(token);
      if (decodeValue) {
        return next();
      } else {
        return reply.status(401).send({ error: "Unauthorized" });
      }
    } catch (err) {
      return reply.status(500).send({ error: "Internal Error" });
    }
  }
});

// Toggle Frontend Serving...
if (appConfig.SERVE_FRONTEND) {
  /* SERVE WEB UI */
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "../web/dist"),
    prefix: "/",
  });

  // Serve index.html for any route
  // not handled by static files
  fastify.setNotFoundHandler((request, reply) => {
    reply.sendFile("index.html");
  });
} else {
  /* SERVE ONLY API */
  fastify.get("/", async (req, reply) => {
    return reply.send({ success: true, msg: "ams api running.." });
  });
}

fastify.get("/api", async (req, reply) => {
  db1.doesUserExist();
  return reply.send({ success: true, msg: "ams api running.." });
});

fastify.post("/api/ping", async (req, reply) => {
  const { timestamp } = req.body;
  const ping = timestamp ? Date.now() - timestamp : -1;
  return reply.send({ success: true, ms: ping });
});

fastify.post("/api/userJoined", async (req, reply) => {
  const { firebaseId, email, name } = req.body;
  console.log(firebaseId, email, name);
  try {
    const { uid: firebaseIdServer } = await UserService.getUserId(req);
    if (firebaseId != firebaseIdServer) {
      throw new Error("Firebase ID did not match!");
    }
    const userExists = await db.doesUserExist(firebaseId);
    let userId;
    if (!userExists) {
      userId = await db.createUser(firebaseId, email, name);
    } else {
      userId = (await db.getUser(firebaseId)).userId;
    }

    return reply.send({ success: true, userId });
  } catch (err) {
    console.log(err);
    return reply.send({ success: false, error: err.message });
  }
});

fastify.post("/api/getUserId", async (req, reply) => {
  try {
    const firebaseId = await UserService.getUserId(req);
    return reply.send({ success: true, firebaseId });
  } catch (err) {
    return reply.send({ success: false, error: err });
  }
});

fastify.get("/api/userModules", async (req, reply) => {
  try {
    const { uid: firebaseId } = await UserService.getUserId(req);
    const { userId } = await db.getUser(firebaseId);
    const modules = await db.getUserModules(userId);
    return reply.send({ success: true, modules });
  } catch (err) {
    console.log(err);
    return reply.send({ success: false, error: err });
  }
});

fastify.put("/api/userModule/:moduleId", async (req, reply) => {
  try {
    const { uid: firebaseId } = await UserService.getUserId(req);
    const { userId } = await db.getUser(firebaseId);
    const modules = await db.getUserModules(userId);
    return reply.send({ success: true, modules });
  } catch (err) {
    console.log(err);
    return reply.send({ success: false, error: err });
  }
});

fastify.get("/api/moduleGroups", async (req, reply) => {
  try {
    const { uid: firebaseId } = await UserService.getUserId(req);
    const { userId } = await db.getUser(firebaseId);
    const groups = await db.getUserModulesGroups(userId);
    return reply.send({ success: true, groups });
  } catch (err) {
    console.log(err);
    return reply.send({ success: false, error: err });
  }
});

fastify.listen(
  { port: appConfig.PORT, host: appConfig.HOST },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Server URL:", address);
    console.log(`Localhost URL: http://${appConfig.HOST}:${appConfig.PORT}`);
  }
);
