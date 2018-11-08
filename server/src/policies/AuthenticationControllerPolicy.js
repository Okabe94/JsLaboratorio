const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      nombre: Joi.string().max(100),
      carnet: Joi.number().integer(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      rango: Joi.number().integer().max(2),
      cargo: Joi.string().max(50)
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'nombre':
          res.status(400).send({
            error: 'Nombres de máximo 100 caracteres'
          })
          break
        case 'carnet':
          res.status(400).send({
            error: 'El carnet tener mínimo 10 numeros'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Se aceptan contraseñas de letras y numeros entre 8 y 32 caracteres`
          })
          break
        case 'rango':
          res.status(400).send({
            error: 'Seleccione permisos para el nuevo usuario'
          })
          break
        case 'cargo':
          res.status(400).send({
            error: 'El cargo debe contener máximo 50 caracteres'
          })
          break
        default:
          res.status(400).send({
            error: 'Información de registro erronea, intente de nuevo'
          })
      }
    } else {
      next()
    }
  }
}
