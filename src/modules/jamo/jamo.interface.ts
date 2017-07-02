import { Document, Model } from 'mongoose';

export interface Jamo extends Document {
  jamo: string;
  tipo: string;
  nombre: string;
  pron: string;
  esc_rom_nombre: string;  // escritura con alfabeto latino del nombre del jamo
  esc_rom: string;         // escritura con alfabeto latino de la pronunciaón del jamo
  img: string;
  audios: string[];        // ids de los audios creados con gridFS de mongodb
}

export interface JamoModel extends Model<Jamo> {
  createJamo(args: any): any;
  list(query?: any): any;
  getVocales(query?: any): any;
  getConsonantes(query?: any): any;
  getGruposConsonanticos(query?: any): any;
}