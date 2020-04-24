import { router } from '../Router';

// middlewares
import { authMiddleware } from '../../middleware/auth';

// controllers
import AuthController from '../../controller/Auth';

router.post('/', AuthController.register);

router.post('/login', AuthController.login);

router.post('/check', authMiddleware, (req, res) => {
  return res.status(200).json({ ok: 'ok' });
});

router.post('/logout', AuthController.logout);

router.get('/refresh', AuthController.refreshToken);

export default router;
