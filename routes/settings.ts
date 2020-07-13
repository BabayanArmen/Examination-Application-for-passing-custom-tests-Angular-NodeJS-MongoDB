import * as express from 'express';
import { SettingsContoller } from '../controllers/settings';
const settingsRouter = express.Router();

//http://localhost:3000/api/settings/reset
settingsRouter.post('/reset', SettingsContoller.resetSettings);

//localhost:3000/api/settings/timer
settingsRouter.get('', SettingsContoller.getSettings);

//localhost:3000/api/settings/category/:id
settingsRouter.put('/category/:id', SettingsContoller.addCategory);

//localhost:3000/api/settings/numforcat/:id
settingsRouter.put('/numforcat/:id', SettingsContoller.addNumForCat);

//localhost:3000/api/settings/removecat/:id
settingsRouter.put('/removecat/:id', SettingsContoller.removeCategory);

//localhost:3000/api/settings/timer/:id
settingsRouter.put('/timer/:id', SettingsContoller.addTimeTime);

export { settingsRouter }