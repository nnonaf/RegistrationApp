var bcrypt = require('bcrypt-nodejs');
const CLOUDANT = process.env.CLOUDANT;
const CLOUDANT_db = process.env.CLOUDANT_DATABASE;
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(CLOUDANT);
 const db = cloudant.db.use(CLOUDANT_db);  


var createIndex = async () => {

    await  db.index({ name:'email', type:'json', index:{fields:['name'] }})
    await  db.index({ name:'password', type:'json', index:{fields:['name'] }})
    await  db.index({ name:'username', type:'json', index:{fields:['name'] }})
}
module.exports = {
    createIndex
  };
  