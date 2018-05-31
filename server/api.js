const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Location = require('./models/Location');

// Authentication Middleware ----------------
module.exports = function(app, config) {

  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access', user: req.user});
    }
  }

  // Api routes -------------------------------------------

  // GET list of locations that can be viewed by all users
  app.get('/api/locations', (req, res) => {
    Location.find( {viewPublic: true}, (err, locations) => {
      let locationsArr = [];
      if (err) {
        return res.status(500).send( {message: err.message} );
      }
      if (locations) {
        locations.forEach(location => {
          locationsArr.push(location);
        });
      }
      res.send(locationsArr);
    });
  });

  // GET list of all locations, public and private (admi only)
  app.get('/api/locations/admin', jwtCheck, adminCheck, (req, res) => {
    Location.find( {}, (err, locations) => {
      let locationsArr = [];
      if (err) {
        return res.status(500).send( {message: err.message} );
      }
      if (locations) {
        locations.forEach(location => {
          locationsArr.push(location);
        });
      }
      res.send(locationsArr);
    });
  });

  // GET location by location ID
  app.get('/api/location/:id', jwtCheck, (req, res) => {
    Location.findById(req.params.id, (err, location) => {
      if (err) {
        return res.status(500).send( {message: err.message} );
      }
      if (!location) {
        return res.status(400).send( {message: 'Location not found.'} );
      }
      res.send(location);
    });
  });

  // GET Api Root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });
}