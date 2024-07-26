const { drizzle } = require("drizzle-orm/mysql2");
const { eq } = require("drizzle-orm");
const mysql = require("mysql2/promise");
const schema = require("./schema");
const { users } = require("./schema");

const connection = mysql.createConnection({
  host: appConfig.DB.host,
  port: appConfig.DB.port,
  user: appConfig.DB.user,
  password: appConfig.DB.password,
  database: appConfig.DB.database,
});

const db = drizzle(connection, {
  schema: schema,
});

module.exports = {
  async doesUserExist(firebaseId) {
    try {
      const result = await db
        .select("1")
        .from(users)
        .where(eq(users.firebaseId, firebaseId));
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error in doesUserExist:", error);
      throw error;
    }
  },
};
