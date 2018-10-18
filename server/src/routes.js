const MonitorController = require('./controllers/MonitorController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StudentController = require('./controllers/StudentControllers')
const EquipController = require('./controllers/EquipControllers')
// const HomeController = require('./controllers/HomeControllers')
const pruebaController = require('./controllers/pruebaControllers')
module.exports = (app) => {
  // User
  app.post('/login', MonitorController.login)
  app.post('/registerMonitor', AuthenticationControllerPolicy.register, MonitorController.register)

  // // Student
  app.post('/registerStudent', StudentController.register)
  app.get('/indexStudent', StudentController.index)

  // // Equip
  app.post('/registerEquip', EquipController.register)
  app.get('/indexEquip', EquipController.index)

  // // Home
  // app.get('/indexHome', HomeController.indexHome)
  // app.post('/indexDetails', HomeController.indexDetail)

  app.get('/prueba', pruebaController.get)
}
