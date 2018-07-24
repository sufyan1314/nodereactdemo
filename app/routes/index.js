const noteRoute = require('./route');

module.exports = function(app, db) {
  noteRoute(app, db);
  // Other route groups could go here, in the future
};
