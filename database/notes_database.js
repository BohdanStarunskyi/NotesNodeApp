const client = require('./mongo_manager');

class NotesDatabase {
    constructor() {
      this.client = client;
      this.db = null;
      this.collection = null;
    }
  
    async connect() {
      await this.client.connect();
      this.db = this.client.db('NotesDatabase');
      this.collection = this.db.collection('Notes');
    }
  
    async saveNote(title, body, ownerId) {
      const newNote = {
        title,
        body,
        ownerId
      };
      const result = await this.collection.insertOne(newNote);
      return result.insertedId;
    }

    async getAllNotes(ownerId) {
        return await this.collection.find({ ownerId: ownerId }).toArray();
    }
  
    async close() {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }
  
  module.exports = new NotesDatabase();
  