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
            error: 'Ingrese un nombre de máximo 100 caracteres'
          })
          break
        case 'Carnet':
          res.status(400).send({
            error: 'El carnet debe ser un número entre 10 y 15 caracteres'
          })
          break
        case 'Pass':
          res.status(400).send({
            error: `Se deben cumplir la siguientes reglas:
              1. La contraseña solo debe contener números y letras. 
              2. Debe contener entre 8 y 32 caracteres`
          })
          break
        case 'FKRango':
          res.status(400).send({
            error: 'Información de registro erronea, intente de nuevo'
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
