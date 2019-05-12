const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      nombre: Joi.string().max(80),
      carnet: Joi.string().max(15),
      documento: Joi.string().max(15),
      tipoDoc: Joi.string().max(5),
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
            error: 'Nombres de máximo 80 caracteres'
          })
          break
        case 'carnet':
          res.status(400).send({
            error: 'El carnet tener máximo 15 numeros'
          })
          break
        case 'documento':
          res.status(400).send({
            error: 'Verifique el número de documento'
          })
          break
        case 'tipoDoc':
          res.status(400).send({
            error: 'Verifique el tipo de documento'
          })
          break
        case 'password':
          res.status(400).send({
            error: `Contraseñas con mínimo 8 y máximo 32 caracteres`
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
