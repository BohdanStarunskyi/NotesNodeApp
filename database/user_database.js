const client = require('./mongo_manager');

class UserDatabase {
  constructor() {
    this.client = client;
    this.db = null;
    this.collection = null;
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('NotesDatabase');
    this.collection = this.db.collection('Users');
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
