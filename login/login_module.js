const UserDatabase = require('../database/user_database');
const LoginResponse = require('./login_response');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class LoginModule{
  async login(model, res) {
    try {
      await UserDatabase.connect();
      const password = await bcrypt.hash(model.password.trim(), saltRounds);
      const user = await UserDatabase.getUser(model.email);
      if (!user) {
        if (!model.email || !password) {
          res.status(400).json(new LoginResponse(null, "error"));
          return;
        }
  
        const result = await UserDatabase.saveUser(model.email, password);
        console.log(result);
        res.json(new LoginResponse(result.insertedId, "success"));
        return;
      }
    
      const isPasswordCorrect = await bcrypt.compare(model.password.trim(), user.password);
      if (isPasswordCorrect) {
        res.json(new LoginResponse(user._id, "success"));
      } else {
        res.status(422).json(new LoginResponse(null, "error"));
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(new LoginResponse(null, "error"));
    }
  }
}

module.exports = new LoginModule();