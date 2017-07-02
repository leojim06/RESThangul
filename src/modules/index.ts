import userRoutes from './users/user.routes';
import jamoRoutes from './jamo/jamo.routes';
import { authJwt, authRole } from '../services/auth.service';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/jamo', jamoRoutes);
  app.get('/private',
    authJwt,
    authRole('Admin'),
    (req, res) => {
      res.status(200).json('This is a private route!!!');
    });
};