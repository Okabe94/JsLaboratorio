module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: 'Hey You are register'
    })
  })
}
