import express from 'express';


export const userRoute = express.Router();

userRoute.get('/home', (req, res) =>{
  res.send("Test");
});

