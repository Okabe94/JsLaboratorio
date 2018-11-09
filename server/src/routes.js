const MonitorController = require('./controllers/MonitorController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StudentController = require('./controllers/StudentControllers')
const EquipController = require('./controllers/EquipControllers')
const HomeController = require('./controllers/HomeControllers')
const RequestController = require('./controllers/RequestControllers')
const CopyController = require('./controllers/CopyControllers')

module.exports = (app) => {
  // User
  app.post('/login', MonitorController.login)
  app.post('/registerMonitor', AuthenticationControllerPolicy.register, MonitorController.register)
  app.get('/indexMonitor', MonitorController.index)
  app.post('/deleteMonitor', MonitorController.delete)

  // Student
  app.post('/registerStudent', StudentController.register)
  app.get('/indexStudent', StudentController.index)

  // Equip
  app.post('/registerEquip', EquipController.register)
  app.get('/indexEquip', EquipController.index)

  // Home
  app.get('/indexHome', HomeController.index)

  // Copy
  app.get('/indexCopy', CopyController.index)

  // Request
  app.post('/request', RequestController.register)
  app.post('/updateEquip', RequestController.updateEquip)
  app.post('/updateMod', RequestController.updateMod)
  app.post('/deleteItem', RequestController.deleteItem)
  app.post('/deleteRequest', RequestController.deleteRequest)
}
