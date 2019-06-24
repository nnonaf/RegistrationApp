var bcrypt = require('bcrypt-nodejs');
var { keys, toLower } = require('lodash');
const CLOUDANT = process.env.CLOUDANT;
const CLOUDANT_db = process.env.CLOUDANT_DATABASE_SYSTEM;
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(CLOUDANT);
const db = cloudant.db.use(CLOUDANT_db);


var createSystem = async (data) => {
  // let system = {
  //   system_id: "tracker" +time(),
  //   security_token: bcrypt.hashSync(security_token_key+time()),
  //   TOC:time()
  // }


  try {
    let security_token_key = process.env.SYSTEM_SECURITY_TOKEN_KEY
    let { role, developer_name } = data

    let newSystem = {
      system_id: "tracker" + Date.now(),
      security_token: bcrypt.hashSync(security_token_key + Date.now()),
      TOC: Date.now(),
      role,
      developer_name


    }
    let system = await db.insert(newSystem);
    let newSystemDate = {system, ...newSystem }
    return newSystemDate;

  } catch (error) {
    throw error;
  }
}


var getSystem = async (data) => {
  try {

    let system = await db.find({ selector: { data } });
    return system


  } catch (error) {
    throw error;
  }
}

var updateSystem = async (cond, data) => {
  try {

  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSystem,
  getSystem,
  updateSystem
};