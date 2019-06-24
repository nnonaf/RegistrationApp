const jwt = require('jsonwebtoken');
const System = require('../data/system');
const { get } = require('lodash');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
  verify: async (req, res, next) => {


      // console.log(req.headers.system)
      next();
 
  },

  post: async (req, res)=>{
    try {

      let {role, developer_name} = req.body
      if (role === null || role === undefined || role.length === 0 &&
         developer_name === null || developer_name === undefined || developer_name.length === 0) {
        return res.status(400).json({ message: 'No role or developer_name' });
      }

       let newSystem = await System.createSystem({role,developer_name})
       res.json(newSystem);
      
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Operation not completed' });
    }
    
     
  }
}