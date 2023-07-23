const UserDatabase = require('../database/user_database');
const LoginResponse = require('./login_response');

async function login(model, res) {
  try {
    await UserDatabase.connect();
    const user = await UserDatabase.getUser(model.email);
    console.log(model)
    if (!user) {
      if (!model.email || !model.password) {
        res.status(400).json(new LoginResponse(null, "error"));
        return;
      }

      const result = await UserDatabase.saveUser(model.email, model.password);
      console.log(result);
      res.json(new LoginResponse(result.insertedId, "success"));
      return;
    }

    if (user.password === model.password) {
      res.json(new LoginResponse(user._id, "success"));
    } else {
      res.status(422).json(new LoginResponse(null, "error"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(new LoginResponse(null, "error"));
  }
}

module.exports = login;