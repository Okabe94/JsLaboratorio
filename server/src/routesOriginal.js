const UserController = require('./controllers/UserControllers')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StudentController = require('./controllers/StudentControllers')
const EquipController = require('./controllers/EquipControllers')
const HomeController = require('./controllers/HomeControllers')
const pruebaController = require('./controllers/pruebaControllers')

module.exports = (app) => {
  // User
  app.post('/login', UserController.login)
  app.post('/register-User', AuthenticationControllerPolicy.register, UserController.register)

  // Student
  app.post('/register-Student', StudentController.register)
  app.get('/indexStudent', StudentController.index)

  // Equip
  app.post('/register-Equip', EquipController.register)
  app.get('/indexEquip', EquipController.index)

  // Home
  app.get('/indexHome', HomeController.indexHome)
  app.post('/indexDetails', HomeController.indexDetail)

  app.get('/prueba', pruebaController.get)
}
