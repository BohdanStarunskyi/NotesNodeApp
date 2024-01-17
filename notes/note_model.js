class NoteModel {
    constructor(ownerId, title, body, id) {
      this.ownerId = ownerId;
      this.title = title;
      this.body = body;
      this.id = id;
    }
}
module.exports = NoteModel;