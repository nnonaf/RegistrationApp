var User = require('../data/user');
var { omit, hasIn, get } = require('lodash');
var emailValidator = require("email-validator");

const accountSid =  process.env.TWILIO_ACCOUNTS_ID
const authToken =  process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);


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
      client.messages
        .create({
          body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
          from: '+15017122661',
          to: '+15558675310'
        })
        .then(message => console.log(message.sid));
      res.json(newUserDetails);

    } catch (error) {
      console.log(error)
      return res.status(400).json(error);
    }

  }
}