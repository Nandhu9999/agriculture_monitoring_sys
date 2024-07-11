const crypto = require("crypto");
module.exports = {
  SERVE_FRONTEND: false,

  PORT: process.env.PORT || 9980,
  HOST: "0.0.0.0" || "localhost" || "127.0.0.1",
  ADMIN_EMAIL: "@gmail.com",
  ADMIN_PASS: process.env.ADMIN_KEY,

  GOOGLE_LLM_API_KEY: process.env.GOOGLE_LLM_API_KEY,
  STORAGE_DIR: "storage",

  EMAIL: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    user: "@gmail.com",
    pass: process.env.AMRITATREES_APP_PASS,
  },

  DB: {
    host: process.env.AIVEN_DB_HOST,
    port: process.env.AIVEN_DB_PORT,
    user: process.env.AIVEN_DB_USER,
    password: process.env.AIVEN_DB_PASS,
    database: "amsdb",
  },

  FB_SERVICE_ACCOUNT: process.env.FB_SERVICE_ACCOUNT,

  getUniqueId: (n = 8) => {
    return crypto.randomBytes(n).toString("hex");
  },
};
