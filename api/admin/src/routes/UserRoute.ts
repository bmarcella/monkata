import express from 'express';

import _serv from '../services/UserService';

export const userRoute = express.Router();

userRoute.get('/getCrossToken/:token', _serv.getCrossToken);
userRoute.get('/home', (req, res) =>{
  res.send("Test");
});

