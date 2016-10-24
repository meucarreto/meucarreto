var path = require('path');
var index = {
 
  renderIndex: function(req, res) {
    res.sendFile(path.resolve('../dist/index.html'));
  },

  renderImages: function(req, res) {
    res.sendFile(path.resolve('../images/'));
  }

};
 
module.exports = index;