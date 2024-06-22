const crypto = require("crypto");
module.exports = {
  PORT: process.env.PORT || 9980,
  HOST: "localhost" || "0.0.0.0" || "127.0.0.1",
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ADMIN_EMAIL: "amritatrees@gmail.com",
  ADMIN_PASS: process.env.ADMIN_KEY,

  GOOGLE_LLM_API_KEY: process.env.GOOGLE_LLM_API_KEY,
  STORAGE_DIR: "storage",

  EMAIL: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    user: "amritatrees@gmail.com",
    pass: process.env.AMRITATREES_APP_PASS,
  },

  getUniqueId: (n = 8) => {
    return crypto.randomBytes(n).toString("hex");
  },
};
