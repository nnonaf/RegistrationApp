var bcrypt = require('bcrypt-nodejs');
var { keys, toLower } = require('lodash');
const CLOUDANT = process.env.CLOUDANT;
const CLOUDANT_db = process.env.CLOUDANT_DATABASE;
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(CLOUDANT);
const db = cloudant.db.use(CLOUDANT_db);

var createUser = async (email, password, username) => {
  try {


    let existingEmail = await db.find({ selector: { email } })

    if (existingEmail.bookmark !== "nil") {
      throw { _message: 'email already exists' };
    }

    let newUserCreation = await db.insert({ email :email,username :username, password:bcrypt.hashSync(password) });
    return newUserCreation
    } catch (error) {
    throw error;
  }
}

var getUsers = async (cond) => {
  try {


    return await db.get("_all_docs");
  } catch (error) {
    throw error;
  }
};

var getUser = async (userId) => {
  try {
    return await db.get(userId);
  } catch (error) {
    console.log(error)
     return error;
  }
}

var getUserByEmail = async (email) => {
  try {
     return await db.find({ selector: { email} })
  } catch (error) {
    throw error;
  }
}

var getUserByUserName = async (userName) => {
  try {
     return  await db.find({ selector:{ username:uesrname}});
  } catch (error) {
    throw error;
  }
}

var authenticate = async (email, password) => {
  try {
    let user = await db.find({ selector: { email}});  
    if (user && bcrypt.compareSync(password, user.docs[0].password)) {
      return user;
    }
    throw { _message: 'email or password incorrect' };
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  authenticate,
  
};
