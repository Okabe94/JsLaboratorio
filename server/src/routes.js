const AuthenticationController = require('./controllers/AuthenticationControllers')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
}
