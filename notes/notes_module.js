const NotesDatabase = require('../database/notes_database');
const NoteResponse = require('./note_response')

class NotesModule {
  async saveNote(model, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.saveNote(model.title, model.body, model.ownerId);
      res.json(new NoteResponse(result, "success"));
      return result;
    } catch (error) {
      console.error('Error saving note:', error);
      res.status(500).json(res.json(new NoteResponse(null, "error")));
    }
  }

  async getAllNotesForUser(ownerId, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.getAllNotes(ownerId);
      res.json(new NoteResponse(result, "success"));
      console.log(result)
      return result;
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json(new NoteResponse(null, "error"));
    }
  }

  async deleteNote(model, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.deleteNote(model.ownerId, model.id);
      res.json(new NoteResponse(result['deletedCount'], "success"));
      return result;
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json(new NoteResponse(null, "error"));
    }
  }

  async updateNote(model, res){
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.updateNote(model.title, model.body, model.ownerId, model.id);
      res.json(new NoteResponse(result.modifiedCount, "success") );
      return result;
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json(new NoteResponse(null, "error"));
    }
  }
}

module.exports = new NotesModule();
