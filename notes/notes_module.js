const { json } = require('body-parser');
const NotesDatabase = require('../database/notes_database');

class NotesModule {
  async saveNote(title, body, ownerId, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.saveNote(title, body, ownerId);
      res.json({
        result: 'Success',
        note_id: result,
      });
      return result;
    } catch (error) {
      console.error('Error saving note:', error);
      res.status(500).json({ result: 'Error' });
    }
  }

  async getAllNotesForUser(ownerId, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.getAllNotes(ownerId);
      res.json({
        result: 'Success',
        notes: result,
      });
      return result;
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json({ result: 'Error' });
    }
  }

  async deleteNote(noteId, ownerId, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.deleteNote(ownerId, noteId);
      res.json({
        result: 'Success',
        deletedCount: result['deletedCount'],
      });
      return result;
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ result: 'Error' });
    }
  }

  async updateNote(title, body, ownerId, noteId, res){
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.updateNote(title, body, ownerId, noteId);
      res.json({
        result: 'Success',
        updated: result.modifiedCount
      });
      return result;
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ result: 'Error' });
    }
  }
}

module.exports = new NotesModule();
