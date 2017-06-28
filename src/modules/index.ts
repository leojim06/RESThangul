import userRoutes from './users/user.routes';
import { authJwt, authRole } from '../services/auth.service';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.get('/private',
    authJwt,
    authRole('Admin'),
    (req, res) => {
      res.status(200).json('This is a private route!!!');
    });
};