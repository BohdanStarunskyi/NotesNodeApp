const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Constants = require('./app_constants')

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const client = new MongoClient(Constants.MONGO_KEY, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});  

async function login(email, password, res) {
  try {
    await client.connect();
    const db = client.db('NotesDatabase');
    const collection = db.collection('Users');

    // Find the user with the given email
    const user = await collection.findOne({ email: email });

    if (!user) {
      new_user = {
        email: email,
        password: password
      }
      result = await collection.insertOne(new_user)
      res.json({ 
        result: 'Registered',
        id: result.insertedId
     });
      return;
    }

    if (user.password === password) {
      res.json({ result: 'Logged in', id: user._id });
    } else {
      res.status(422).json({ result: 'Wrong password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ result: 'Error logging in' });
  }
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  login(email, password, res);
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
