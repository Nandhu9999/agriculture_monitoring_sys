var admin = require("firebase-admin");
const appConfig = require("../appConfig");

// var serviceAccount = require("./serviceAccount.json");

const buff = new Buffer.from(appConfig.FB_SERVICE_ACCOUNT, "base64");
const serviceAccountText = buff.toString("ascii");
var serviceAccount = JSON.parse(serviceAccountText);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
