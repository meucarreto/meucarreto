var jwt = require('jwt-simple');
var userTableController = require('../app/user/user.controller.js');

var auth = {
 
  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    
    userTableController.checkUser(username, password, function(data) {
        if(!data.error) {
          res.json(genToken(data));  
        } else {
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
          return;
        }
    });

  
  },
 
  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
 
  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;