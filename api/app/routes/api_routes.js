var carsController = require('../controllers/cars');

function apiRoutes(api) {
  api.get('/cars', carsController.get);
}

module.exports = apiRoutes;
