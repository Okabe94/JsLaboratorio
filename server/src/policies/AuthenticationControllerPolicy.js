const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      Nombre: Joi.string().max(100),
      Carnet: Joi.number().integer(),
      Pass: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      FKRango: Joi.number().integer().max(2)
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'Nombre':
          res.status(400).send({
            error: 'Nombres de máximo 100 caracteres'
          })
          break
        case 'Carnet':
          res.status(400).send({
            error: 'El carnet tener mínimo 10 numeros'
          })
          break
        case 'Pass':
          res.status(400).send({
            error: `Se aceptan contraseñas de letras y numeros entre 8 y 32 caracteres`
          })
          break
        case 'FKRango':
          res.status(400).send({
            error: 'Seleccione permisos para el nuevo usuario'
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
