const mysql = require("mysql2");
const appConfig = require("../appConfig");

const dbpool = mysql
  .createPool({
    host: appConfig.DB.host,
    port: appConfig.DB.port,
    user: appConfig.DB.user,
    password: appConfig.DB.password,
    database: appConfig.DB.database,
  })
  .promise();

module.exports = {
  async doesUserExist(firebaseId) {
    const [rows] = await dbpool.query(
      `
      SELECT 1 
      FROM user 
      WHERE firebaseId = ?
      `,
      [firebaseId]
    );

    return rows.length > 0;
  },

  async createUser(firebaseId, email, name, keys = {}, isAdmin = 0) {
    if (!name) {
      name = email.split("@")[0];
    }
    const [result] = await dbpool.query(
      `
      INSERT INTO 
      user (firebaseId, email, name, \`keys\`, isAdmin)
      VALUES (?, ?, ?, ?, ?)
      `,
      [firebaseId, email, name, JSON.stringify(keys), isAdmin]
    );
    return result.insertId;
  },

  async getUser(firebaseId) {
    const [rows] = await dbpool.query(
      `
      SELECT * 
      FROM user 
      WHERE firebaseId = ?
      `,
      [firebaseId]
    );
    return rows[0];
  },

  async getUserModules(id) {
    /*
     * SELECT *
     * FROM module
     * INNER JOIN userModule
     * WHERE module.moduleId = userModule.moduleId
     *  AND userId = ?
     */

    const [rows] = await dbpool.query(
      `
      SELECT * 
      FROM module 
      WHERE moduleId 
      IN (
          SELECT moduleId 
          FROM userModule 
          WHERE userId = 1
        )
      `,
      [id]
    );
    const result = rows.map((m) => ({
      ...m,
      values: JSON.parse(m.values),
    }));
    console.log(result);
    return result;
  },

  async getModules(a) {
    if (typeof a === "number") {
      const [rows] = await dbpool.query(
        `
        SELECT * 
        FROM module 
        WHERE moduleId = ?
        `,
        [a]
      );
      const result = { ...rows[0], values: JSON.parse(rows[0].values) };
      return result;
    } else if (Array.isArray(a)) {
      const [rows] = await dbpool.query(
        `
        SELECT * 
        FROM module 
        WHERE moduleId IN (${a.map(() => "?").join(",")})`,
        a
      );
      const result = rows.map((m) => ({
        ...m,
        values: JSON.parse(m.values),
      }));
      return result;
    }
    return;
  },

  async getUserModulesGroups(id) {
    const [rows] = await dbpool.query(
      `
      SELECT * 
      FROM moduleGroup 
      WHERE userId = ?
      `,
      [id]
    );
    const result = await Promise.all(
      rows.map(async (row) => {
        const moduleIdList = row.modulesArray.split(",").map((i) => Number(i));
        const modules = await this.getModules(moduleIdList);
        return {
          ...row,
          modulesArray: modules,
        };
      })
    );
    return result;
  },
};
