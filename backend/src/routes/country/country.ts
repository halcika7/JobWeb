import { router } from '../Router';

// conrollers
import { CountryControllerinstance as CountryController } from '../../controller/Country';

router.get('/', CountryController.getCountries);

export default router;
