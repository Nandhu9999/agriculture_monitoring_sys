const fs = require("fs");
// Initialize the database
const dbFile = "./.data/sys.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

dbWrapper
  .open({ filename: dbFile, driver: sqlite3.Database })
  .then(async (dBase) => {
    db = dBase;

    try {
      if (!exists) {
        console.log("*creating new db");

        /* -------------------------------------------------------------------------------
         * | serviceId | serialNo | imageURL | scheduledTimes | uploadCount | isBlocked |
         * -------------------------------------------------------------------------------
         */
        await db.run(
          "CREATE TABLE service (serviceId TEXT PRIMARY KEY, serialNo TEXT UNIQUE, imageURL TEXT DEFAULT 'https://cdn.discordapp.com/attachments/1193931945923596368/1195080716854243468/default.png', scheduledTimes TEXT DEFAULT '8:00', uploadCount INTEGER DEFAULT 0, isBlocked INTEGER DEFAULT 0)"
        );

        /* ---------------------------------------
         * | userId | userName | email | isAdmin |
         * ---------------------------------------
         */
        await db.run(
          "CREATE TABLE user (userId TEXT PRIMARY KEY, userName TEXT, email TEXT, isAdmin INTEGER DEFAULT 0)"
        );

        /* ----------------------------------
         * | userId | serviceId | startDate |
         * ----------------------------------
         */
        await db.run(
          "CREATE TABLE account (userId TEXT, serviceId TEXT, startDate DATE DEFAULT CURRENT_TIMESTAMP)"
        );
      } else {
        console.log("*db exists");
      }
    } catch (dbError) {
      console.log(dbError);
    }
  });

module.exports = {
  createService: async (serviceId, serialNo) => {
    try {
      return await db.run(
        "INSERT INTO service (serviceId, serialNo) VALUES (?, ?)",
        [serviceId, serialNo]
      );
    } catch (dbError) {
      console.error(dbError);
    }
  },
  allServices: async () => {
    try {
      return await db.all("SELECT * FROM service");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  serviceIsBlocked: async (serviceId) => {
    try {
      return (
        (
          await db.all("SELECT isBlocked FROM service WHERE serviceId = ? ", [
            serviceId,
          ])
        )[0] !== "0"
      );
    } catch (dbError) {
      console.error(dbError);
    }
  },
  serviceLogUploadImage: async (serviceId, imageURL) => {
    try {
      return await db.run(
        "UPDATE service WHERE serviceId = ? SET imageURL = ? AND uploadCount = uploadCount + 1",
        [serviceId, imageURL]
      );
    } catch (dbError) {
      console.error(dbError);
    }
  },

  createUser: async (userId, userName, email, isAdmin = 0) => {
    try {
      return await db.run(
        "INSERT INTO user (userId, userName, email, isAdmin) VALUES (?, ?, ?, ?)",
        [userId, userName, email, isAdmin]
      );
    } catch (dbError) {
      console.error(dbError);
    }
  },
};
