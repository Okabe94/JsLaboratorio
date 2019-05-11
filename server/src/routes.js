const HomeController = require('./controllers/HomeControllers')
const CopyController = require('./controllers/CopyControllers')
const EquipController = require('./controllers/EquipControllers')
const MonitorController = require('./controllers/MonitorController')
const RequestController = require('./controllers/RequestControllers')
const StudentController = require('./controllers/StudentControllers')
const ReusableController = require('./controllers/ReusableController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // User
  app.post('/login', MonitorController.login)
  app.get('/indexMonitor', MonitorController.index)
  app.post('/deleteMonitor', MonitorController.delete)
  app.post('/registerMonitor', AuthenticationControllerPolicy.register, MonitorController.register)

  // Student
  app.get('/indexStudent', StudentController.index)
  app.post('/updateStudent', StudentController.update)
  app.post('/registerStudent', StudentController.register)

  // Equip
  app.get('/indexEquip', EquipController.index)
  app.post('/registerEquip', EquipController.register)

  // Home
  app.get('/indexHome', HomeController.index)

  // Copy
  app.get('/indexCopy', CopyController.index)

  // Request
  app.post('/request', RequestController.register)
  app.post('/updateMod', RequestController.updateMod)
  app.post('/deleteItem', RequestController.deleteItem)
  app.post('/updateEquip', RequestController.updateEquip)
  app.post('/deleteRequest', RequestController.deleteRequest)

  // Reusable
  app.get('/indexReusable', ReusableController.index)
  app.get('/indexCarrers', ReusableController.indexCarrers)
  app.get('/indexDocumentos', ReusableController.indexDocuments)
}
