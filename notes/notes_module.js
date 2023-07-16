const { json } = require('body-parser');
const NotesDatabase = require('../database/notes_database');

class NotesModule {
  async saveNote(model, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.saveNote(model.title, model.body, model.ownerId);
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
      console.log(result)
      return result;
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json({ result: 'Error' });
    }
  }

  async deleteNote(model, res) {
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.deleteNote(model.ownerId, model.id);
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

  async updateNote(model, res){
    try {
      await NotesDatabase.connect();
      const result = await NotesDatabase.updateNote(model.title, model.body, model.ownerId, model.id);
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
