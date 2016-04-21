var restify   = require('restify'),
    fs        = require('fs'),
    namespace = require('restify-namespace'),
    api       = restify.createServer();

api
  .use(restify.fullResponse())
  .use(restify.bodyParser())
  .use(restify.queryParser())
  .use(restify.CORS());

// Setup CORS
api.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  return next();
})

// Load all routes
var routesPath =  process.cwd() + '/app/routes';
fs.readdirSync(routesPath).forEach(function(file) {
  if (file.indexOf('.js') !== -1) {
    namespace(api, '/api/v1', function () {
      route = require(routesPath + '/' + file);
      route(api);
    });
  }
})

// Initialize API on the specified port and ip address
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
api.listen(port, ipaddress, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.log('App is ready at : ' + port)
  }
})
