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

        /* -------------------------------------------------------------------------------------
         * | serviceId | serialNo | imageURL | scheduledTimes | uploadCount | isBlocked | data |
         * -------------------------------------------------------------------------------------
         */
        await db.run(
          "CREATE TABLE services (serviceId TEXT PRIMARY KEY, serialNo TEXT UNIQUE, imageURL TEXT DEFAULT 'https://cdn.discordapp.com/attachments/1193931945923596368/1195080716854243468/default.png', scheduledTimes TEXT DEFAULT '8:00', uploadCount INTEGER DEFAULT 0, isBlocked INTEGER DEFAULT 0, data TEXT DEFAULT '{}')"
        );

        /* ---------------------------------------
         * | userId | userName | email | isAdmin |
         * ---------------------------------------
         */
        await db.run(
          "CREATE TABLE users (userId TEXT PRIMARY KEY, userName TEXT, email TEXT UNIQUE, isAdmin INTEGER DEFAULT 0)"
        );

        /* ----------------------------------
         * | userId | serviceId | startDate |
         * ----------------------------------
         */
        await db.run(
          "CREATE TABLE accounts (userId TEXT, serviceId TEXT, startDate DATE DEFAULT CURRENT_TIMESTAMP)"
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
      return {
        dbStatus: "success",
        data: await db.run(
          "INSERT INTO services (serviceId, serialNo) VALUES (?, ?)",
          [serviceId, serialNo]
        ),
      };
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  getServices: async (serviceId = null) => {
    try {
      if (serviceId) {
        return {
          dbStatus: "success",
          data: await db.all("SELECT * FROM services"),
        };
      } else {
        return {
          dbStatus: "success",
          data: await db.all("SELECT * FROM services WHERE serviceId = ?", [
            serviceId,
          ]),
        };
      }
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  getUserServices: async (userId) => {
    try {
      if (userId) {
        return {
          dbStatus: "success",
          data: await db.all(
            "SELECT s.* FROM services s JOIN accounts a ON s.serviceId = a.serviceId WHERE a.userId = ?",
            [userId]
          ),
        };
      } else {
        return { dbError: "userId not provided" };
      }
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  serviceIsBlocked: async (serviceId) => {
    try {
      return {
        dbStatus: "success",
        data:
          (
            await db.all(
              "SELECT isBlocked FROM services WHERE serviceId = ? ",
              [serviceId]
            )
          )[0] !== "0",
      };
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  serviceLogUploadImage: async (serviceId, imageURL) => {
    try {
      return {
        dbStatus: "success",
        data: await db.run(
          "UPDATE services WHERE serviceId = ? SET imageURL = ? AND uploadCount = uploadCount + 1",
          [serviceId, imageURL]
        ),
      };
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  getUsers: async (userId = null) => {
    try {
      if (userId) {
        return {
          dbStatus: "success",
          data: await db.all("SELECT * FROM users WHERE userId = ?", [userId]),
        };
      } else {
        return {
          dbStatus: "success",
          data: await db.all("SELECT * FROM users"),
        };
      }
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  createUser: async (userId, userName, email, isAdmin = 0) => {
    try {
      return {
        dbStatus: "success",
        data: await db.run(
          "INSERT INTO users (userId, userName, email, isAdmin) VALUES (?, ?, ?, ?)",
          [userId, userName, email, isAdmin]
        ),
      };
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  getAccounts: async () => {
    try {
      return {
        dbStatus: "success",
        data: await db.all("SELECT * FROM accounts"),
      };
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
  createAccount: async (userId, serviceId) => {
    try {
      return {
        dbStatus: "success",
        data: await db.run(
          "INSERT INTO accounts (userId,serviceId) VALUES (?, ?)",
          [userId, serviceId]
        ),
      };
    } catch (dbError) {
      //console.error(dbError);
      return { dbStatus: "error", dbError };
    }
  },
};
