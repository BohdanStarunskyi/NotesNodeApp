const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const login = require('./login/login_module');
const NotesModule = require('./notes/notes_module')
const LoginRequeestModel = require('./models/login_models')
const NotesModel = require('./models/notes_models')


const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
 
app.post('/login', (req, res) => {
  const model = new LoginRequeestModel(req.body)
  login(model, res);
});

app.post('/note', (req, res) => {
  const ownerId = req.headers.ownerid
  if(ownerId == null || ownerId == "")
    res.status(422).json({result: "ownerId can't be null or empty"});
  else{
    const model = new NotesModel(req.headers.ownerid, req.body.title, req.body.body);
    NotesModule.saveNote(model, res);
  }
});

app.get('/notes', (req, res) => {
  const ownerId = req.headers.ownerid;
  if(ownerId == null || ownerId == "")
    res.status(422).json({result: "ownerId can't be null or empty"});
  else
    NotesModule.getAllNotesForUser(ownerId, res);
});

app.delete('/note', (req, res) => {
  const noteId = req.query.noteId;
  const ownerId = req.headers.ownerid;
  if(ownerId == null || ownerId == "")
    res.status(422).json({result: "ownerId can't be null or empty"});
  else{
    const model = new NotesModel(ownerId, null, null, noteId);
    NotesModule.decleteNote(model, res);
  }
});

app.put('/note', (req, res) => {
  const ownerId = req.headers.ownerid
  const noteId = req.body.noteId
  if(ownerId == null || noteId == null || ownerId == "" || noteId == "")
    res.status(422).json({result: "ownerId and noteId can't be null or empty"});
  else{
  const model = new NotesModel(ownerId, req.body.title, req.body.body, noteId)
  NotesModule.updateNote(model, res);
  }
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
