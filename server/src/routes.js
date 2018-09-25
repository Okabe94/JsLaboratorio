const AuthenticationController = require('./controllers/AuthenticationControllers')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const LendController = require('./controllers/LendControllers')
const EquipRegisterController = require('./controllers/EquipRegisterControllers')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.get('/lend', LendController.index)

  app.post('/equip', EquipRegisterController.register)
}
