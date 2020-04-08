import { AuthControllerinstance as AuthController } from '../../controller/AuthController';
import { router } from '../Router';

router.post('/', AuthController.register);

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

router.post('/forgot', AuthController.forgotPassword);

router.post('/reset', AuthController.resetPassword);

router.post('/activate', AuthController.activateAccount);

router.post('/reactivate', AuthController.reactivateAccount);

router.get('/refresh', AuthController.refreshToken);

export default router;
