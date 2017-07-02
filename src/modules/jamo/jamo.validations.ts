import * as Joi from 'joi'

export default {
  createJamo: {
    body: {
      jamo: Joi.string().required(),
      tipo: Joi.string().allow('Vocal', 'Vocal Doble',
        'Consonante', 'Consonante Derivada', 'Consonante Doble',
        'Grupo Consonantico').required(),
      nombre: Joi.string().required(),
      esc_rom_nombre: Joi.string().required(),
      esc_rom: Joi.string()
    }
  },
  updateJamo: {
    body: {
      jamo: Joi.string(),
      tipo: Joi.string().allow('Vocal', 'Vocal Doble',
        'Consonante', 'Consonante Derivada', 'Consonante Doble',
        'Grupo Consonantico'),
      nombre: Joi.string(),
      esc_rom_nombre: Joi.string(),
      esc_rom: Joi.string()
    }
  }
}