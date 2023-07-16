const UserDatabase = require('../database/user_database');

async function login(model, res) {
    try {
      await UserDatabase.connect()
      // Find the user with the given email
      const user = await UserDatabase.getUser(model.email)
  
      if (!user) {
        result = await UserDatabase.saveUser(model.email, model.password)
        res.json({ 
          result: 'Registered',
          id: result.insertedId
       });
        return;
      }
  
      if (user.password === model.password) {
        res.json({ result: 'Logged in', id: user._id });
      } else {
        res.status(422).json({ result: 'Wrong password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ result: 'Error logging in' });
    }
  }
  module.exports = login;