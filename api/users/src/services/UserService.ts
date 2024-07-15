/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import * as bcrypt from 'bcrypt';
import {
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { servicesApp } from '../../../../common/index/Frontend';
import {
  GenToken,
  getPayload,
  JwtPayload,
  VerifyRefreshToken,
} from '../../../../common/keycloak/AuthMiddleware';
import MailService from '../../../../common/mail/MailService';
import { random } from '../../../emploi/src/utils/Helper';
import { Avatar } from '../entity/Avatar';
import { CrossToken } from '../entity/CrossToken';
import { DefaultAvatar } from '../entity/Default';
import { KcUser } from '../entity/KC_User';
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
  hashPassword: async (password: string): Promise<{ hash: string, salt: string }> => {
    const saltRounds: number = 10; // Adjust the cost factor according to your security requirements and server capabilities
    try {
      const salt: string = await bcrypt.genSalt(saltRounds);
      const hash: string = await bcrypt.hash(password, salt);
      return { hash, salt };
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  },
  recoverHashPassword: async (salt: any, password: string): Promise<string> => {
    const saltRounds: number = 10;
    try {
      const hash: string = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  },
  

  register: async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User);
    const email = req.body.email;
    const user = await userRepository.findOne({
      where: { email }
    });
    if (user) return res.status(409).send({ message: "Email Existe deja !" });
    const u = new User();
    u.email = req.body.email;
    u.firstName = req.body.firstname;
    u.lastName = req.body.lastname;
    try {
      const state = await services.createUser(u, req);
      if (state) {
        const nkcToken = await services.autoLogin(u.email + "", req.body.password, req);
        if (!nkcToken) return res.status(404).send({ message: "Email n'existe pas!" });
        const kcToken = nkcToken as KCToken;
        const user = state as KcUser;
        u.keycloakId = user.sub;
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
  createUser: async (ud: any, req: Request): Promise<boolean | KcUser> => {
    const userRepository = req.DB.getRepository(KcUser);
    const user = await userRepository.findOne({
      where: { email: ud.email }
    });
    if (user) return false;
    const ph = await services.hashPassword(req.body.password);
    let u = new KcUser();
    u.email = ud.email;
    u.given_name = ud.firstName;
    u.family_name = ud.lastName;
    u.password = ph.hash;
    u.salt = ph.salt;
    u.sub = await uuidv4();
    u = await userRepository.save(u);
    return u;
  },
  autoLogin: async (username: string, password: string, req: Request) => {
    try {
      const userRepository = req.DB.getRepository(KcUser);
      const user: KcUser = await userRepository.findOne({
        where: { email: username }
      });
      if (!user) throw { message: "Email non trouvé" };
      const hp = await services.recoverHashPassword(user.salt, password);
      if (hp == user.password) {
        user.password = "";
        user.salt = "";
        const token = services.getKCToken(user);
        return token as KCToken;
      }
    } catch (error: any) {
      console.error('Auth Error but account have been created', error);
      throw error;
    }
  },
  getKCToken(user: KcUser ) : KCToken {
    const  PUBLIC_KEY  = process.env.PUBLIC_KEY;
    const payload = {
      sub: user.sub,
      given_name: user.given_name,
      family_name: user.family_name,
      email: user.email,
    };
    const at = GenToken(jwt, payload, PUBLIC_KEY + "", "24h");
    const rt = GenToken(jwt, payload, PUBLIC_KEY + "", "18h");
    return  {
      access_token: at,
      expires_in: 86000,
      "not-before-policy": 0,
      refresh_expires_in: 64800,
      refresh_token: rt,
      scope: "profile email",
      session_state: uuidv4(),
      token_type: "Bearer",
    };
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
  setCToken: async (token: any, req: Request, kcToken: KCToken, id: string) => {
    if (token) {
      const rep = req.DB.getRepository(CrossToken);
      const ck: CrossToken = await rep.findOne({
        where: { token }
      });
      if (ck) {
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
    const { PUBLIC_KEY } = process.env;
    let kcToken;
    try {
      kcToken = await services.autoLogin(username, password, req) as KCToken;
    } catch (error: any) {
      console.log("AUTO_LOGIN", error);
      return res.status(500).send(error);
    }
    if (!kcToken?.access_token)  return res.status(401).send({ message:'Token DiD Not Generate '});

    try {
      const PL: JwtPayload = getPayload(jwt, kcToken.access_token, PUBLIC_KEY + "");
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
      console.log("PUBLIC_KEY", error);
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
      u.keycloakId = PL.sub;
      return await userRepository.save(u);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  refreshtoken: async (req: Request, res: Response) => {
    const refreshToken = req.params.token;
    const { PUBLIC_KEY } = process.env;
    try {
      const payload  = VerifyRefreshToken(jwt, refreshToken, PUBLIC_KEY+"");
      if(!payload.error) {
        const userRepository = req.DB.getRepository(KcUser);
        const user = await userRepository.findOne({
          where: { sub: payload.data?.sub }
        });
        user.password = "";
        user.salt = "";
        const token = services.getKCToken(user);
        return res.status(200).send(token as KCToken);
      } else {
        return res.status(403).send({
          message: payload.message
        });
      }
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
    const userRepository = req.DB.getRepository(KcUser);

    const keycloakId = req.payload?.sub;
    const user: KcUser = await userRepository.findOne({
      where: { sub:  keycloakId }
    });

    if (!user) return res.status(200).send({
      error: true,
      message: "Utilisateur non trouvé",
      code: 404,
      type: "danger",
      data: {}
    });

    try {
      const isOk = await services.verifyPassword(req.body.oldPassword, user );
      if (!isOk) return res.status(200).send({
        error: true,
        message: "Ancien mot de passe non identique.",
        code: 404,
        type: "danger",
        data: {}
      });
      const state = await services.changeUserPass( req.body.newPassword, keycloakId + "", req);
      if (state) {
        return res.send({
          error: false,
          message: "Mot de passe modifié avec succes.",
          type: "success",
          code: 404,
          data: state
        });
      } else {
        return res.send({
          error: true,
          message: "Mot de passe non modifié",
          code: 404,
          type: "danger",
          data: state
        });

      }
    } catch (error) {
      return res.status(200).send({
        error: true,
        message: "Erreur serveur",
        code: 500,
        type: "danger",
        data: error
      });
    }
  },
  verifyPassword: async (password: string, user: any) => {
    try {
      const hp = await services.recoverHashPassword(user.salt, password);
      if (hp == user.password) {
        return true;
      }
     return false;
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  },
  changeUserPass: async (password: any, id: string, req: Request) => {
    try {
      const userRepository = req.DB.getRepository(KcUser);
      const u = await userRepository.findOne({
        where: { sub: id }
      });
      const hp = await services.hashPassword(password);
      u.password = hp.hash;
      u.salt = hp.salt;
      await userRepository.save(u);
      return true
    } catch (error: any) {
      console.error('Error creating user:', error.response.data);
      throw error;
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const userRepository = req.DB.getRepository(User);
      const email = req.body?.email;
      let userToUpdate: User = await userRepository.findOne({
        where: { email }
      });
      const code = random(123123, 999999).toString();
      userToUpdate.reset_code = code;
      userToUpdate = await userRepository.save(userToUpdate);
      console.log("USER : ", userToUpdate);
      try {
         MailService.reset_password(req, { code, email: email, firstName: userToUpdate.firstName });
      } catch (error) {
        console.log(error);
      }

      return res.status(200).send({
        firstName: userToUpdate.firstName,
        lastName: userToUpdate.lastName
      });

    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  resetNowPassword: async (req: Request, res: Response) => {
    try {
      const userRepository = req.DB.getRepository(User);
      const { email, code, password, password_2 } = req.body.data;
      console.log(req.body);
      if (password != password_2) {
        return res.status(200).send({
          error: true,
          message: "Mot de passe identique!"
        });
      }

      const user: User = await userRepository.findOne({
        where: { email }
      });

      const getDay = (date1: Date, date2: Date) => {
        if (date1 == undefined) return 0;
        const Difference_In_Time =
          date2.getTime() - date1.getTime();
        const date = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        console.log("Day : ", date);
        return date;
      }

      if (user.attempt >= 5 && getDay(user.date_block, new Date()) < 1) {
        const code = random(123123, 999999).toString();
        user.reset_code = code;
        user.date_block = new Date();
        console.log("CODE : ", code);
        await userRepository.save(user);
        user.reset_code = "";
        return res.status(200).send({
          error: true,
          user,
          message: "Vous avez atteint le nombre de d'essaie pour la journée"
        });
      }

      if (user.reset_code != code) {
        user.attempt += 1;
        console.log("CODE : ", user.reset_code, "<=>", code);
        // await userRepository.save(user);
        return res.status(200).send({
          error: true,
          message: "Code validation non valide"
        });
      }
      const state = await services.changeUserPass( password, user.keycloakId + "", req);
      if (state) {
        try {
          MailService.reset_password(req, { code, email: email, firstName: user.firstName });
        } catch (error) {
          console.log(error);
        }
        user.reset_code = "";
        return res.send({
          error: false,
          message: "Mot de passe modifié avec succes.",
          type: "success",
          code: 404,
          data: state,
          user
        });
      } else {
        return res.send({
          error: true,
          message: "Mot de passe non modifié",
          code: 404,
          type: "danger",
          data: state
        });

      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

};
export default services;