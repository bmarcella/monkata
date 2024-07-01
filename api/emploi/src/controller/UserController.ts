import UserService from '../services/UserService';
import BaseController from './BaseController';
import  {  Request, Response } from "express";

export default class UserController extends BaseController {
  static _me : UserController;
  constructor() {
     super();
  }
 public static init() {
  if (this._me==undefined) {
     this._me = new UserController();
  }
  return this._me;
 }

 public home (req: Request, res: Response) {
   return UserService.home(req, res);
 }

 public profil (req: Request, res: Response) {
   return UserService.home(req,res);
 }

}