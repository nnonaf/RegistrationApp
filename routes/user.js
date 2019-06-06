var User = require('../data/user');
var { omit, hasIn, get } = require('lodash');

module.exports = {
  get: async (req, res) => {
    if (req.params.id && (req.user.isAdmin || req.user.id === req.params.id)) {
      try {
        let user = await User.getUser(req.params.id, req.query);
        res.json(user);
      } catch (error) {
        res.status(404).json({ message: 'failed to retrieve user' });
        console.log(error);
      }
    } else if (req.user.isAdmin) {
      try {
        let users = await User.getUsers(req.query);
        res.json(users);
      } catch (error) {
        res.status(400).json({ message: 'failed to retrieve users' });
        console.log(error);
      }
    } else {
      res.status(400).json({ message: 'failed to retrieve users' });
    }
  },
  post: async (req, res) => {
    

    // console.log(req.body)

    try {

      let { email, password,others} = req.body;

      let user = await User.createUser(email, password, others);
      res.json(user);

          
      
    } catch (error) {
        console.log(error)
    }
    // if (req.user.isAdmin) { 

    //   let { email, password, others } = req.body;
    //   try {
    //     if (hasIn(others, 'merchantVerified') || hasIn(others, 'disabled') || hasIn(others, 'verified')) {
    //       return res.status(400).json({ message: 'operation not allowed' });
    //     }
    //     let user = await User.createUser(email, password, others);
    //     res.json(user);
    //   } catch (error) {
    //     res.status(400).json({ message: get(error, '_message', 'failed to create user') });
    //     console.log(error);
    //   }
    // } else {
    //   res.status(400).json({ message: 'failed to create user' });
    // }
  },
  put: async (req, res) => {
    if (req.user.isAdmin || req.user.id === req.params.id) {
      var update = req.body;
      if (!req.user.isAdmin && (hasIn(update, 'merchantVerified') || hasIn(update, 'disabled') || hasIn(update, 'verified') || hasIn(update, 'role'))) {
        return res.status(400).json({ message: 'operation not allowed' });
      }
      try {
        let user = await User.updateUser(req.params.id, update);
        res.json(user);
      } catch (error) {
        res.status(400).json({ message: 'failed to update user' });
        console.log(error);
      }
    } else {
      res.status(400).json({ message: 'failed to update user' });
    }
  }
}