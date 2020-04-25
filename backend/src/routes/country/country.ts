import { router } from '@route/Router';

// conrollers
import { CountryControllerinstance as CountryController } from '@controller/Country';

router.get('/', CountryController.getCountries);

export default router;
