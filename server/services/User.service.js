const firebaseAdmin = require("../firebase/firebase-config.js");

module.exports = {
  getToken(req) {
    return req.headers.authorization?.split(" ")[1];
  },
  getDecodedToken(token) {
    return firebaseAdmin.auth().verifyIdToken(token);
  },
  async getDecodedTokenAsync(token) {
    return await firebaseAdmin.auth().verifyIdToken(token);
  },
  async getUserAsync(uid) {
    return await firebaseAdmin.auth().getUser(uid);
  },
  async getUserDetails(token) {
    try {
      const decodedToken = await this.getDecodedTokenAsync(token);
      const user = await this.getUserAsync(decodedToken.uid);
      return user;
    } catch (error) {
      console.error("Error getting user details:", error);
      return null;
    }
  },

  async getUserId(req) {
    const token = this.getToken(req);
    const firebaseId = await this.getDecodedTokenAsync(token);
    return firebaseId;
  },
};
