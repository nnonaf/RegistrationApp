// var { User } = require('../models');
var bcrypt = require('bcrypt-nodejs');
var { keys, toLower} = require('lodash');
var { generateSearchQuery, generateGetSingleQuery } = require('./utils');
const CLOUDANT = process.env.CLOUDANT;
const CLOUDANT_db = process.env.CLOUDANT_DATABASE;
var User = require(CLOUDANT_db)(CLOUDANT);

var createUser = async (email, password, others) => {
  try {

     //CHECK IF USER NAME IS EXITING ON DB


     //CHECK IF EMAIL IS EXITING ON THE DB



     //REGISTER USER WITH HASHED PASSWORD

         
         let see = await User.insert({ _id: 'dog1', name:'Bobby', colour:'black', collection:'dogs', cost:45, weight:6.4})
        //  .then(console.log);
        console.log(see);
    // let existingEmail = await User.findOne({ email: new RegExp("^" + email + "$", 'i') });
    // if (existingEmail) {
    //   throw { _message: 'email already exists' };
    // }
    // let user = new User(Object.assign({ email, password: bcrypt.hashSync(password) }, others));
    // return await user.save();
  } catch (error) {
    throw error;
  }
}

var getUsers = async (cond) => {
  try {


    // return await generateSearchQuery(User, cond);
  } catch (error) {
    throw error;
  }
};

var getUser = async (cond, options) => {
  try {



    // return await generateGetSingleQuery(User, cond, options);
  } catch (error) {
    throw error;
  }
}

var getUserByEmail = async (email) => {
  try {
    // return await User.findOne({ email: new RegExp("^" + email + "$", 'i') });



  } catch (error) {
    throw error;
  }
}

var getUserByUserName = async (userName) => {
  try {


    // return await User.findOne({ userName: new RegExp(userName, 'i') });
  } catch (error) {
    throw error;
  }
}

var authenticate = async (email, password) => {
  try {
    let user = await User.findOne({ email: new RegExp("^" + email + "$", 'i') });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw { _message: 'email or password incorrect' };
  } catch (error) {
    throw error;
  }
}

var updateUser = async (id, data) => {
  try {
    let user = await User.findById(id);
    keys(data).forEach((k) => {
      switch (k) {
        case 'password':
          user.password = bcrypt.hashSync(data[k]);
          break;
        default:
          user[k] = data[k];
      }
    });
    await user.save();
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
}

var deleteUser = (id) => updateUser(id, { disabled: true });

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  authenticate,
  updateUser,
  deleteUser
};
