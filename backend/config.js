const crypto = require("crypto");

const config = {};

config.DISCORD_WEBHOOK_API =
  "https://discord.com/api/webhooks/1193940594255470692/s8wjAtGkJEqoWB6BukbpJ9vSnctatWqDPo5pktP_dcPhjFqu_f9QJ1uF0Lwmlrb_AGyW";
config.PORT = process.env.PORT || 9980;
config.HOST = "0.0.0.0";

config.getUniqueId = (n = 8) => {
  return crypto.randomBytes(n).toString("hex");
};

module.exports = config;
