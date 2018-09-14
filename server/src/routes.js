const AuthenticationController = require('./controllers/AuthenticationControllers')
const CreationController = require('./controllers/CreationControllers')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register', CreationController.createMonitor)
}
