var olxController       = require('../controllers/olx'),
    encuentraController = require('../controllers/encuentra');

function apiRoutes(api) {
  api.get('/olx', olxController.get);
  api.get('/encuentra', encuentraController.get);
}

module.exports = apiRoutes;
