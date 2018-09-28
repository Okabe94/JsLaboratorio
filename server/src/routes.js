const AuthenticationController = require('./controllers/AuthenticationControllers')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const EquipRegisterController = require('./controllers/EquipRegisterControllers')
const StudentRegisterController = require('./controllers/StudentRegisterControllers')
const MainTableController = require('./controllers/MainTableControllers')

module.exports = (app) => {
  app.post('/login', AuthenticationController.login)
  app.post('/register-User', AuthenticationControllerPolicy.register, AuthenticationController.register)

  app.post('/register-Student', StudentRegisterController.register)

  app.post('/register-Equip', EquipRegisterController.register)

  app.get('/mainTable', MainTableController.index)
}
