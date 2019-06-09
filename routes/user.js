var User = require('../data/user');
var { omit, hasIn, get } = require('lodash');
var emailValidator = require("email-validator");

module.exports = {
  get: async (req, res) => {
    if (req.params.id) {
      try {
        let user = await User.getUser(req.params.id);       
        res.json(user.docs[0]);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'failed to retrieve user' });
      }

    } else {
      try {
       
        let users = await User.getUsers();
        res.json(users);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'failed to retrieve users' });
      }
    }

  },
  post: async (req, res) => {
    try {
      let { email, password, username } = req.body;
      let emailIsValide = emailValidator.validate(email);
      if (password === null || password === undefined || password.length === 0) {
        return res.status(400).json({ message: 'Password is missing' });
      }
      if (emailIsValide === false) {
        return res.status(400).json({ message: 'Invalide email address' });
      }
      let newUserDetails = await User.createUser(email, password, username);
      //let {password, ...res} = {password, ...req.body, ...newUserDetails }
      res.json(newUserDetails);

    } catch (error) {
      console.log(error)
      return res.status(400).json(error);
    }

  }
}