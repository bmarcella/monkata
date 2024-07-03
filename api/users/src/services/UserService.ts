/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import * as bcrypt from 'bcrypt';
import {
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';

import { servicesApp } from '../../../../common/index/Frontend';
import {
  getPayload,
  JwtPayload,
} from '../../../../common/keycloak/AuthMiddleware';
import MailService from '../../../../common/mail/MailService';
import { random } from '../../../emploi/src/utils/Helper';
import { Avatar } from '../entity/Avatar';
import { CrossToken } from '../entity/CrossToken';
import { DefaultAvatar } from '../entity/Default';
import { Logo } from '../entity/Logo';
import { User } from '../entity/User';

export class KCToken {
  access_token: string;
  expires_in: number
  "not-before-policy": number
  refresh_expires_in: number
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string
}

const { KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;

const services = {
  home: async (req: Request, res: Response) => {
    res.send({
      service_name: process.env.SERVICE_NAME,
      port: process.env.PORT
    });
  },
  profil: (req: Request, res: Response) => {
    return res.send("Profil user");
  },
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds: number = 10; // Adjust the cost factor according to your security requirements and server capabilities
    try {
      const salt: string = await bcrypt.genSalt(saltRounds);
      const hash: string = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  },
  verifyPassword: async (submittedPassword: string, storedHash: string) => {
    try {
      // Compare the submitted password with the stored hash
      const isMatch = await bcrypt.compare(submittedPassword, storedHash);

      if (isMatch) {
        console.log('Passwords match!');
      } else {
        console.log('Passwords do not match.');
      }
      return isMatch; // true if passwords match, false otherwise
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  },
  register: async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User);
    const email = req.body.email;
    const user = await userRepository.findOne({
      where: { email }
    });
    if (user) return res.status(409).send({ message : "Email Existe deja !" });
    const u = new User();
    u.email = req.body.email;
    u.firstName = req.body.firstname;
    u.lastName = req.body.lastname;
    u.password = req.body.password;
    const { KEYCLOAK_PUBLIC_KEY, KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    try {
      const token = await services.getAdminToken(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", KEYCLOAK_RESOURCE + "", KEYCLOAK_SECRET + "");
      const state = await services.createUser(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", token, services.getKCUser(u));
      if (state) {
        const kcToken = await services.autoLogin(u.email + "", req.body.password);
        const PL = getPayload(jwt, kcToken.access_token, KEYCLOAK_PUBLIC_KEY + "");
        u.password = await services.hashPassword(req.body.password);
        u.keycloakId = PL.sub;
        const profil = await userRepository.save(u);
        return res.send({
          kcToken,
          profil
        });
      } else {
        throw new Error(`User Provider is down, try again later`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getKCUser: (u: User) => {
    return {
      username: u.email + "_" + Date.now(),
      enabled: true,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      credentials: [
        {
          type: 'password',
          value: u.password,
          temporary: false // Set to true if the password should be changed on the first login
        }
      ],
      // Additional user attributes can be added here if needed
    };
  },
  createUser: async (keycloakUrl: string, realm: string, adminToken: string, userData: any) => {
    // const usersEndpoint = `${keycloakUrl}/admin/realms/users`;
    const usersEndpoint = `${keycloakUrl}/admin/realms/${realm}/users`;
    try {
      const response = await axios.post(usersEndpoint, userData, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      // If the user is created successfully, Keycloak returns a 201 status code.
      if (response.status === 201) {
        return true
      } else {
        return false;
      }
    } catch (error: any) {
      console.error('Error creating user:', error.response.data);
      throw error;
    }
  },
  autoLogin: async (username: string, password: string): Promise<KCToken> => {
    const { KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    const clientId = KEYCLOAK_RESOURCE + "";
    const tokenEndpoint = `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      client_id: clientId,
      username: username,
      password: password,
      grant_type: 'password',
      client_secret: KEYCLOAK_SECRET + ""
    });

    try {
      const response = await axios.post(tokenEndpoint, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      });
      return response.data as KCToken;
    } catch (error: any) {
      console.error('Auth Error but account have been created', error);
      throw error;
    }
  },
  test: async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User);
    const keycloakId = req.params.data;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    const { KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    try {
      const token = await services.getAdminToken(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", KEYCLOAK_RESOURCE + "", KEYCLOAK_SECRET + "");
      const data = await services.getUserInfo(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", token, keycloakId);
      return res.status(200).send({data, user});
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserInfo: async (keycloakUrl: any, realm: string, accessToken: string, userId: string) => {
    const userInfoEndpoint = `${keycloakUrl}/admin/realms/${realm}/users/${userId}`;
    try {
      const response = await axios.get(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error retrieving user info:', error);
      throw error;
    }
  },
  getAdminToken: async (keycloakUrl: string, realm: string, clientId: string, clientSecret: string) => {
    const tokenEndpoint = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    });
    try {
      const response = await axios.post(tokenEndpoint, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error obtaining admin token:', error);
      throw error;
    }
  },
  logout: async (req: Request, res: Response) => {
    const { KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    const clientId = KEYCLOAK_RESOURCE + "";
    const tokenEndpoint = `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`;

    const data = new URLSearchParams({
      client_id: clientId,
      refresh_token: req.params.token,
      client_secret: KEYCLOAK_SECRET + ""
    });
    try {
      const response = await axios.post(tokenEndpoint, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      });
      return res.send(response.data);
    } catch (error) {
      return res.status(401).send({
        message: "token expired"
      });
    }
  }
  ,
  setCToken: async (token: any, req: Request, kcToken: KCToken, id: string ) => {
    if (token){
      const rep = req.DB.getRepository(CrossToken);
      const ck: CrossToken = await rep.findOne({
        where: { token }
      });
      if (ck){
        ck.kCToken = JSON.stringify(kcToken);
        ck.userId = id;
        await rep.save(ck);
        const app = servicesApp[ck.appName];
        return app;
      }
    }

    return false;
  },

  login: async (req: Request, res: Response) => {
 
    const token = req.params.token;
    const username = req.body.username;
    const password = req.body.password;
    const { KEYCLOAK_PUBLIC_KEY } = process.env;
    let kcToken;
    try {
     kcToken = await services.autoLogin(username, password) as KCToken;
    } catch (error: any) {
      return res.status(error.response.status).send(error);
    }
    try {
      const PL: JwtPayload = getPayload(jwt, kcToken.access_token, KEYCLOAK_PUBLIC_KEY + "");
      const email = PL.email;
      const userRepository = req.DB.getTreeRepository(User);
      let profil: User = await userRepository.findOne({
        where: { email }
      });

      if (!profil) profil = await services.autoRegister(PL, password, req);

      const ct = await services.setCToken(token, req, kcToken, profil.keycloakId || "");

      return res.send({
        kcToken,
        profil,
        cross_token: ct
      });

    } catch (error) {

      return res.status(500).send({
       message: error
      });

    }
  },
  autoRegister: async (PL: JwtPayload, password: string, req: Request) => {
    try {
      const userRepository = req.DB.getRepository(User);
      const u = new User();
      u.email = PL.email;
      u.firstName = PL.given_name;
      u.lastName = PL.family_name;
      u.password = await services.hashPassword(password);
      u.keycloakId = PL.sub;
      return await userRepository.save(u);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  refreshtoken: async (req: Request, res: Response) => {
    const refreshToken = req.params.token;
    const { KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    const clientId = KEYCLOAK_RESOURCE + "";
    const tokenEndpoint = `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
    const data = new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      client_secret: KEYCLOAK_SECRET + "",
      refresh_token: refreshToken
    });
    try {
      const response = await axios.post(tokenEndpoint, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
      });
      return res.status(200).send(response.data as KCToken);
    } catch (error) {
      return res.status(403).send({
        message: "Refresh token expired"
      });
    }
  },
  avatar: async (req: Request, res: Response) => {
    try {
      const avatarRepository = req.DB.getRepository(Avatar);
      const avatar: Avatar = await avatarRepository.findOne({
        where: { id_user: req.params.id }
      });
      let buffer = null;
      let mime = 'image/png';
      if (!avatar) {
        buffer = Buffer.from(DefaultAvatar, 'base64');
      } else {
        buffer = avatar.data;
        mime = avatar.mime;
      }
      res.contentType(mime);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  logo: async (req: Request, res: Response) => {
    try {
      const avatarRepository = req.DB.getRepository(Logo);
      const avatar: Logo = await avatarRepository.findOne({
        where: { id_ent: req.params.id }
      });
      let buffer = null;
      let mime = 'image/png';
      if (!avatar) {
        buffer = Buffer.from(DefaultAvatar, 'base64');
      } else {
        buffer = avatar.data;
        mime = avatar.mime;
      }
      res.contentType(mime);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  updateAvatar: async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });

    const avatarRepository = req.DB.getRepository(Avatar);

    const avatar = await avatarRepository.findOne({
      where: { id_user: user.id }
    });

    try {
      return res.status(200).send({});
    } catch (error) {
      console.error('Auth Error but account have been created', error);
      throw error;
    }
  },
  userProfil: async (req: Request, res: Response) => {
    try {
      const userRepository = req.DB.getRepository(User);
      const keycloakId = req.payload?.sub;
      const profil = await userRepository.findOne({
        where: { keycloakId }
      });
      res.send(profil);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
,
editPassword: async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User);
    const keycloakId = req.payload?.sub;
    const user: User = await userRepository.findOne({
      where: { keycloakId }
    });

    if (!user) return res.status(200).send({
      error: true,
      message: "Utilisateur non trouvé",
      code: 404,
      type: "danger",
      data : {}
    });

   const isOk = await services.verifyPassword (req.body.oldPassword, user.password+"");
  
   if (!isOk) return res.status(200).send({
    error: true,
    message: "Ancien mot de passe non identique.",
    code: 404,
    type: "danger",
    data : {}
  });

   const data=  {
      "type": "password",
      "temporary": false,
      "value": req.body.newPassword
    };
    const { KEYCLOAK_PUBLIC_KEY, KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    try {
      const token = await services.getAdminToken(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", KEYCLOAK_RESOURCE + "", KEYCLOAK_SECRET + "");
      const state = await services.changeUserPass(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", token, data, keycloakId+"");
      if (state) {
        return res.send({
          error: false,
          message: "Mot de passe modifié avec succes.",
          type: "success",
          code: 404,
          data : state
        });
      } else {
        return res.send({
          error: true,
          message: "Mot de passe non modifié",
          code: 404,
          type: "danger",
          data : state
        });
        
      }
    } catch (error) {
      return res.status(200).send({
        error: true,
        message: "Erreur serveur",
        code: 500,
        type: "danger",
        data : error
      });
    }
  },
changeUserPass: async (keycloakUrl: string, realm: string, adminToken: string, userData: any, user_id: string) => {

    const usersEndpoint = `${keycloakUrl}/admin/realms/${realm}/users/${user_id}/reset-password`;
   try {
      const response = await axios.put(usersEndpoint, userData, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      // If the user is created successfully, Keycloak returns a 201 status code.
      if (response.status === 201 || response.status === 204 ) {
        return true
      } else {
        return false;
      }
    } catch (error: any) {
      console.error('Error creating user:', error.response.data);
      throw error;
    }
},

resetPassword : async (req: Request, res: Response) => {
  try {
  const userRepository = req.DB.getRepository(User);
  const email = req.body?.email;
  let userToUpdate : User = await userRepository.findOne({
    where: { email }
  });
  const code = random(123123, 999999).toString();
  userToUpdate.reset_code = code;
 
  userToUpdate = await userRepository.save(userToUpdate);

  console.log("USER : ",userToUpdate);
  MailService.reset_password(req, { code, email : email, firstName: userToUpdate.firstName });
  return res.status(200).send({
    firstName : userToUpdate.firstName,
    lastName : userToUpdate.lastName
  });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
},

resetNowPassword : async (req: Request, res: Response) => {
  try {
  const userRepository = req.DB.getRepository(User);
  const { email, code, password, password_2 } = req.body.data;
  console.log(req.body);
  if (password != password_2) {
    return res.status(200).send({
    error: true,
    message : "Mot de passe identique!"
  });
}

  const user : User = await userRepository.findOne({
    where: { email }
  });

  const getDay = (date1: Date, date2: Date)=>{
    if (date1 == undefined) return 0;
    const Difference_In_Time =
    date2.getTime() - date1.getTime();
    const date = Math.round (Difference_In_Time / (1000 * 3600 * 24));
    console.log("Day : ",date);
    return date;
  }

  if ( user.attempt>=5 && getDay(user.date_block, new Date()) < 1) {
    const code = random(123123, 999999).toString();
    user.reset_code = code;
    user.date_block = new Date();
    console.log("CODE : ",code);
    await userRepository.save(user);
    user.reset_code = "";
    return res.status(200).send({
    error: true,
    user,
    message : "Vous avez atteint le nombre de d'essaie pour la journée"
   });
  }


  
  if ( user.reset_code != code  ) {
    user.attempt +=  1;
    console.log("CODE : ",user.reset_code, "<=>",code);
   // await userRepository.save(user);
    return res.status(200).send({
    error: true,
    message : "Code validation non valide"
  });
  }

  const data=  {
    "type": "password",
    "temporary": false,
    "value": password
  };
  const { KEYCLOAK_PUBLIC_KEY, KEYCLOAK_SECRET, KEYCLOAK_RESOURCE, KEYCLOAK_SERVER_URL, KEYCLOAK_REALM } = process.env;
    const token = await services.getAdminToken(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", KEYCLOAK_RESOURCE + "", KEYCLOAK_SECRET + "");
    const state = await services.changeUserPass(KEYCLOAK_SERVER_URL + "", KEYCLOAK_REALM + "", token, data, user.keycloakId+"");

    if (state) {
      MailService.reset_password(req, { code, email : email, firstName: user.firstName });
      user.reset_code = "";
      return res.send({
        error: false,
        message: "Mot de passe modifié avec succes.",
        type: "success",
        code: 404,
        data : state,
        user
      });
    } else {
      return res.send({
        error: true,
        message: "Mot de passe non modifié",
        code: 404,
        type: "danger",
        data : state
      });
      
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
},
  
};
export default services;