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
        // 1. USER tbl
        db.run(
          "CREATE TABLE user (userId INTEGER PRIMARY KEY AUTOINCREMENT, firebaseId TEXT, email TEXT, name TEXT, keys TEXT, isAdmin INTEGER)"
        );

        // 2. MODULE tbl
        db.run(
          "CREATE TABLE module (moduleId INTEGER PRIMARY KEY AUTOINCREMENT, deviceId TEXT, name TEXT, description TEXT, data TEXT, code TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)"
        );

        // 3. MODULE GROUP tbl
        db.run(
          "CREATE TABLE moduleGroup (moduleGroupId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)"
        );

        // 4. USER MODULE tbl
        db.run(
          "CREATE TABLE userModule (userId INTEGER NOT NULL, moduleId INTEGER NOT NULL)"
        );

        // 5. MODULE GROUPING tbl
        db.run(
          "CREATE TABLE moduleGrouping (moduleId INTEGER NOT NULL, moduleGroupId INTEGER NOT NULL)"
        );

        // 6. DHT TRACKING tbl
        db.run(
          "CREATE TABLE dhtTracking (trackingId INTEGER PRIMARY KEY AUTOINCREMENT, moduleId INTEGER NOT NULL, temperature INTEGER NOT NULL, humidity INTEGER NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)"
        );

        // 7. IMAGE TRACKING tbl
        db.run(
          "CREATE TABLE imageTracking (trackingId INTEGER PRIMARY KEY AUTOINCREMENT, moduleId INTEGER NOT NULL, path TEXT, result TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)"
        );

        db.run(
          "INSERT INTO user (firebaseId, email, name, keys, isAdmin) VALUES (?, ?, ?, ?, ?)",
          [
            "eplLl6oPPSVDzmttktFJkr99GX53",
            "nandhakumar2058@gmail.com",
            "nandhakumar vl",
            "{'key1': 'value1', 'key2': 'value2'}",
            1,
          ]
        );
      } else {
        console.log("*db exists");
      }
    } catch (dbError) {
      console.log(dbError);
    }
  });

module.exports = {
  runQueryAll: async (q) => {
    try {
      return await db.all(q);
    } catch (dbError) {
      console.error(dbError);
      return dbError;
    }
  },
  runQueryExecute: async (q) => {
    try {
      return await db.run(q);
    } catch (dbError) {
      console.error(dbError);
      return dbError;
    }
  },
};
