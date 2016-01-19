var carsController = require('../controllers/cars_controller');

function apiRoutes(api) {
  api.get('/cars', carsController.get);
}

module.exports = apiRoutes;
