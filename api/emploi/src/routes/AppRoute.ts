import axios from 'axios';
import express from 'express';

import { ReCaptcha } from '../../../../common/index/ReCaptcha';
import { upload } from '../multer';
import services from '../services/AnoPostService';

export const appRoute = express.Router();
const ctrl = services
appRoute.post('/add', [ upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'lm', maxCount: 1 }
]), ReCaptcha(axios)], ctrl.add);