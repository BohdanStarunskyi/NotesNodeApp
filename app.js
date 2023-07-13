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

app.post('/new-note', (req, res) => {
  const {ownerId, title, body} = req.body
  NotesModule.saveNote(title, body, ownerId, res)
});

app.get('/notes', async (req, res) => {
  const ownerId = req.query.ownerId;
  NotesModule.getAllNotesForUser(ownerId, res)
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
