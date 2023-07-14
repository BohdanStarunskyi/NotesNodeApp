const client = require('./mongo_manager');
const Constants = require('../constants/app_constants');

class UserDatabase {
  constructor() {
    this.client = client;
    this.db = null;
    this.collection = null;
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(Constants.AUTH_DB);
    this.collection = this.db.collection(Constants.AUTH_COLLECTION);
  }

  async saveUser(email, password) {
    const newUser = {
      email,
      password,
    };
    const result = await this.collection.insertOne(newUser);
    return result.insertedId;
  }

  async getUser(email) {
    return this.collection.findOne({ email });
  }

  async close() {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }
}

module.exports = new UserDatabase();
