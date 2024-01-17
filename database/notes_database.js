const client = require('./mongo_manager');
const { ObjectId } = require('mongodb');
const Constants = require('../constants/app_constants');
const NoteModel = require('../notes/note_model')

class NotesDatabase {
    constructor() {
      this.client = client;
      this.db = null;
      this.collection = null;
    }
  
    async connect() {
      this.db = this.client.db(Constants.NOTES_DB);
      this.collection = this.db.collection(Constants.NOTES_COLLECTION);
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
      const notes = await this.collection.find({ownerId: ownerId}).toArray();
      return notes.map(({ _id, title, body }) => new NoteModel(ownerId, title, body, _id));
    }

    async deleteNote(ownerId, noteId) {
      const query = {
        _id: new ObjectId(noteId),
        ownerId: ownerId
      };
      const result = await this.collection.deleteOne(query);
      return await result;
    }

    async updateNote(title, body, ownerId, noteId){
      const query = {
        _id: new ObjectId(noteId),
        ownerId: ownerId
      };
    
      const update = {
        $set: {
          title: title,
          body: body
        }
      };
    
      return await this.collection.updateOne(query, update);
    }
  
    async close() {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    }
  }
  
  module.exports = new NotesDatabase();
  