/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {
  Request,
  Response,
} from 'express';

import {
  Http,
  SERV_EP,
} from '../../../../common/index/Http';
import { getService } from '../../../../common/index/services';
import { User } from '../entity/User';
import {
  Role,
  UserRole,
} from '../entity/UserRole';

const services = {

  getCrossToken: async (req: Request, res: Response) => {
    const token = req.params.token;
    const { GATEWAY_URL } = process.env;
    const http = new Http(axios, req.token || '');
    const path = getService("users").path;
    const URL = GATEWAY_URL + path + SERV_EP.getCrossToken + token;
    const resp = await http.get(URL, false);

    const userRepository = req.DB.getRepository(User);
    const userRoleRepository = req.DB.getRepository(UserRole);
    const userCount = await userRepository.count();
    const id_user = resp.profil.id;
    if (userCount == 0) {
      const id_user = resp.profil.id;
      let u = new User();
      u.id_user = id_user;
      u.firstName = resp.profil.firstName;
      u.lastName = resp.profil.lastName;
      u.email = resp.profil.email;
      u.keycloakId = resp.profil.keycloakId;
      u = await userRepository.save(u);
      resp.user = u;
      let ur: UserRole = new UserRole();
      ur.keycloakId = resp.profil.keycloakId;
      ur.role_name = Role.SUPER_ADMIN;
      ur = await userRoleRepository.save(ur);
      resp.role = ur;
      return res.status(200).send(resp);
    } else {

      let user: User = await userRepository.findOne({
        where: { id_user }
      });
      if (!user) { return res.status(401).send({ message: "You are not authorized to this website!" }); }
      else {
        let role = await userRoleRepository.findOne({
          where: { keycloakId: user.keycloakId }
        });
        resp.user = user;
        resp.role = role;
        return res.status(200).send(resp);
      }
    }

  }

};
export default services;