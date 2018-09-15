const AuthenticationController = require('./controllers/AuthenticationControllers')
<<<<<<< HEAD
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
=======

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
>>>>>>> parent of 736a80b... Integraciones para la creación de monitores
}
