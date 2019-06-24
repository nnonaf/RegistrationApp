var bcrypt = require('bcrypt-nodejs');
const CLOUDANT = process.env.CLOUDANT;
const CLOUDANT_db = process.env.CLOUDANT_DATABASE_SYSTEM;
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(CLOUDANT);
 const db = cloudant.db.use(CLOUDANT_db);


var createIndex = async () => {
  try {
    await  db.index({ name:'security_token', type:'json', index:{fields:['name'] }})
    await  db.index({ name:'developer_name', type:'json', index:{fields:['name'] }})

    
  } catch (error) {
     console.log(error)
  }
   
}
module.exports = {
    createIndex
  };
