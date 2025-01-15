import axios from 'axios';
import express from 'express';
import * as jwt from 'jsonwebtoken';

import { ReCaptcha } from '../../../../common/index/ReCaptcha';
import { free, protect } from '../../../../common/keycloak/AuthMiddleware';
import { upload } from '../multer';
import _serv from '../services/UserService';

export const userRoute = express.Router();

userRoute.get('/avatar/:id', _serv.avatar);
userRoute.get('/getCrossToken/:token', _serv.getCrossToken);
userRoute.get('/del/:id', _serv.delCv);
userRoute.get('/get', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.get);
userRoute.get('/getFull', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.getFull);
userRoute.post('/edit', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.edit);
userRoute.post('/changeAvatar', upload.single('file'), protect(jwt,process.env.PUBLIC_KEY+""),  _serv.changeAvatar);
// WORKS
userRoute.get('/addEmptyWork', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addEmptyWork);
userRoute.get('/delWork/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delWork);
userRoute.post('/editWork', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.editWork);

// ETUDES
userRoute.get('/addEmptyEtude', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addEmptyEtude);
userRoute.get('/delEtude/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delEtude);
userRoute.post('/editEtude', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.editEtude);

// REFS
userRoute.get('/addEmptyRef', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addEmptyRef);
userRoute.get('/delRef/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delRef);
userRoute.post('/editRef', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.editRef);

// REFS
userRoute.post('/addLang', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addLang);
userRoute.get('/delLang/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delLang);

// REFS
userRoute.post('/addSkill', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addSkill);
userRoute.get('/delSkill/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delSkill);

// REFS
userRoute.post('/addDoc',upload.single('file'), protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addDoc);
userRoute.get('/delDoc/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delDoc);
userRoute.get('/getAllDocs', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.getAllDocs);

// Apply
userRoute.post('/apply', [protect(jwt,process.env.PUBLIC_KEY+""), ReCaptcha(axios) ],  _serv.apply);
userRoute.get('/candidature/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.candidature);

//DASHBOARD
userRoute.get('/dashboard', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.dashboard);

//ENTREPRISE
userRoute.get('/entreprises', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.entreprises);
userRoute.get('/entreprise/:id', free(jwt,process.env.PUBLIC_KEY+""),  _serv.getEntrepriseById);
userRoute.delete('/deleteEntreprise/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.delEntreprise);

//ADRESSE
userRoute.post('/editAdresse/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.editAdresse);
userRoute.post('/addAdresse/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.addAdresse);

userRoute.post('/editEntreprise/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.editEntreprise);

// getCVForRecuiter
userRoute.get('/getCVForRecuiter/:id', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.getCVForRecuiter);


// getCVForRecuiter
userRoute.get('/getDocById/:id',  _serv.getDocById);

// getCVForRecuiter
userRoute.get('/completion', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.completion);


// refresh
userRoute.get('/refresh', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.completion);

// refresh
userRoute.post('/changePassword', protect(jwt,process.env.PUBLIC_KEY+""),  _serv.editPassword);


// ENT 
userRoute.get('/logo/:id', _serv.logo);
userRoute.post('/changeLogo/:id', upload.single('file'), protect(jwt,process.env.PUBLIC_KEY+""), _serv.changeLogo);

userRoute.post('/contact', ReCaptcha(axios) , _serv.contact);

userRoute.get('/approveUser/:code', protect(jwt,process.env.PUBLIC_KEY+""), _serv.approveUser);


