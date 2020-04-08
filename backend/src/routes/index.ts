import { router } from './Router';
import authRoutes from './auth/auth';
import countryRoutes from './country/country';

router.use('/auth', authRoutes);
router.use('/country', countryRoutes);

export default router;
