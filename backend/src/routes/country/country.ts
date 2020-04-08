import { CountryControllerinstance as CountryController } from '../../controller/CountryController';
import { router } from '../Router';

router.get('/', CountryController.getCountries);

export default router;
