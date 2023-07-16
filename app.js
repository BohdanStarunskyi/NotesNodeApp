const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const login = require('./login/login_module');
const NotesModule = require('./notes/notes_module')

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
 
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  login(email, password, res);
});

app.post('/note', (req, res) => {
  const ownerId = req.headers.ownerid
  const {title, body} = req.body;
  NotesModule.saveNote(title, body, ownerId, res);
});

app.get('/notes', (req, res) => {
  const ownerId = req.headers.ownerid
  NotesModule.getAllNotesForUser(ownerId, res);
});

app.delete('/note', (req, res) => {
  const noteId = req.query.noteId;
  const ownerId = req.headers.ownerid;
  console.log(req.headers);
  NotesModule.deleteNote(noteId, ownerId, res);
});

app.put('/note', (req, res) => {
  const ownerId = req.headers.ownerid
  const {noteId, title, body} = req.body;
  NotesModule.updateNote(title, body, ownerId, noteId, res)
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
