module.exports = {
  port: process.env.PORT || 8081,
  db: 'mongodb://localhost:27017/Laboratorio',
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
