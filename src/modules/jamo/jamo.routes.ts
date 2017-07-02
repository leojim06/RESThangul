import { Router } from 'express';
import * as validate from 'express-validation';
import * as multer from 'multer';
// import * as multer from 'multer';

import * as jamoController from './jamo.controller';
import { authJwt, authRole } from '../../services/auth.service';
import jamoValidation from './jamo.validations';
import Jamo from './jamo.model';

const routes: Router = Router();
const upload = multer({ dest: 'audio/' });

routes.post('/',
  authJwt,
  authRole('Admin'),
  validate(jamoValidation.createJamo),
  jamoController.createJamo);
routes.get('/', jamoController.getJamos);
routes.get('/vocales', jamoController.getVocales);
routes.get('/consonantes', jamoController.getConsonantes);
routes.get('/grupos_consonanticos', jamoController.getGruposConsonanticos);

routes.get('/:id', jamoController.getJamoById);
routes.patch('/:id',
  authJwt,
  authRole('Admin'),
  validate(jamoValidation.updateJamo),
  jamoController.updateJamo);
routes.delete('/:id', authJwt, authRole('Admin'), jamoController.deletJamo);

routes.post('/:id/audio',
  upload.array('audio'),
  authJwt,
  authRole('Admin'),
  jamoController.addAudioToJamo);
routes.get('/:id/audio/:filename', jamoController.getAudioFromJamo);

routes.post('/:id/img',
  upload.single('img'),
  authJwt, authRole('Admin'),
  jamoController.addImgToJamo);
routes.get('/:id/img', jamoController.getImgFromJamo);




export default routes;