const UserController = require('./controllers/UserControllers')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StudentController = require('./controllers/StudentControllers')
const EquipController = require('./controllers/EquipControllers')

module.exports = (app) => {
  // User
  app.post('/login', UserController.login)
  app.post('/register-User', AuthenticationControllerPolicy.register, UserController.register)

  // Student
  app.post('/register-Student', StudentController.register)

  // Equip
  app.post('/register-Equip', EquipController.register)
  app.get('/indexEquip', EquipController.index)
}
