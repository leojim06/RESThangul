import { model, Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { JamoModel } from './jamo.interface';

const JamoSchema = new Schema({
  jamo: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'La letra en coreano es requerido']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de letra es requerido'],
    enum: [
      'Vocal', 'Vocal Doble',
      'Consonante', 'Consonante Derivada', 'Consonante Doble',
      'Grupo Consonantico'
    ]
  },
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre de la letra en coreano es requerido']
  },
  pron: {
    type: String,
    trim: true,
    required: [true, 'La pronunciación en alfabeto latino es requerida']
  },
  esc_rom_nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre del jamo en alfabeto latino es requerido']
  },
  esc_rom: {
    type: String,
    trim: true
  },
  img: {
    type: String,
    trim: true
  },
  audios: [{
    type: String,
    trim: true
  }]
});

JamoSchema.plugin(uniqueValidator, {
  message: '{VALUE} ya fue tomado',
});

JamoSchema.methods = {};

JamoSchema.statics = {
  async createJamo(body) {
    return await this.create(body);
  },
  list(query) {
    let result = this.find()
      .sort({ jamo: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit);

    if (query.type) {
      result = result.find({ tipo: { $regex: query.type } })
    }
    if (query.count) return result.count();
    return result;
  },
  getVocales(query) {
    let result = this.find({
      tipo: { $in: ['Vocal', 'Vocal Doble'] }
    }).sort({ jamo: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit);

    if (query.count) return result.count();
    return result;
  },
  getConsonantes(query) {
    let result = this.find({
      tipo: { $in: ['Consonante', 'Consonante Derivada', 'Consonante Doble',] }
    }).sort({ jamo: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit);

    if (query.count) return result.count();
    return result;
  },
  getGruposConsonanticos(query) {
    let result = this.find({
      tipo: { $in: ['Grupo Consonantico'] }
    }).sort({ jamo: 1 })
      .skip((query.limit * query.page) + query.skip)
      .limit(query.limit);

    if (query.count) return result.count();
    return result;
  },
}

export default <JamoModel>model('Jamo', JamoSchema);


      // 'Vocal', 'Vocal Doble',
      // 'Consonante', 'Consonante Derivada', 'Consonante Doble',
      // 'Grupo Consonantico'