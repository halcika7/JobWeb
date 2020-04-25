import { router } from '@route/Router';

// middlewares
// import { authMiddleware } from '../../middleware/auth';
import { limiter } from '@middleware/rateLimiter';

// controllers
import AuthController from '@controller/Auth';

const loginLimit = limiter(60 * 60 * 1000, 5);

const registerLimit = limiter(60 * 60 * 1000 * 24, 10);

router.post('/', AuthController.register);

router.post('/login', loginLimit, AuthController.login);

router.post('/logout', AuthController.logout);

router.get('/refresh', AuthController.refreshToken);

export default router;
