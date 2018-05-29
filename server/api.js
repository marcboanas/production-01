const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
//const Location = require('./models/Location');

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

  // GET Api Root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });
}