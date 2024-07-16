/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';

import {
  Http,
  SERV_EP,
} from '../../../../common/index/Http';
import { getService } from '../../../../common/index/services';
import { Avatar } from '../entity/Avatar';
import { Contact } from '../entity/Contact';
import { DefaultAvatar } from '../entity/Default';
import { DefaultLogo } from '../entity/DLogo';
import { Documents } from '../entity/Documents';
import { Etudes } from '../entity/Etudes';
import { Jobs } from '../entity/Jobs';
import { LanguageSkills } from '../entity/LanguageSkills';
import { Logo } from '../entity/Logo';
import {
  Etat_demande,
  Postulants,
} from '../entity/Postulants';
import { References } from '../entity/References';
import { Skills } from '../entity/Skills';
import { User_Cv } from '../entity/User_Cv';
import { Works_exp } from '../entity/Works_exp';

const services = {
  home : async (req: Request, res: Response) => {
    return res.send("Test");
  },
  profil : (req: Request, res: Response) => {
    return res.send("Profil user");
  },
  getCrossToken : async (req: Request, res: Response) => {
    const token = req.params.token;
    const { GATEWAY_URL } = process.env;
    const http = new Http(axios, req.token || '');
    const path = getService("users").path;
    const URL = GATEWAY_URL+path+SERV_EP.getCrossToken+token;
    const resp =   await http.get(URL,false) ;
  
    const userRepository = req.DB.getRepository(User_Cv);
    const id_user = resp.profil.id;
    let user = await userRepository.findOne({
      where: { id_user }
    });


    if(!user) {
      const u = new  User_Cv ();
      u.id_user = resp.profil.id;
      u.firstName = resp.profil.firstName;
      u.lastName = resp.profil.lastName;
      u.sexe = resp.profil.sexe;
      u.email_contact = resp.profil.email;
      u.telephone_a = resp.profil.phone;
      u.keycloakId = resp.profil.keycloakId;
      user = await userRepository.save(u);
    }
    resp.user = user;
    return res.status(200).send(resp);
  },
  delCv : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
     // Construct the where condition
     const whereCondition = { id_user: req.params.id };
     whereCondition["id_user"] = req.params.id;
     // Execute the delete operation
     await userRepository.delete(whereCondition);
    return res.status(200).send({ message: ""});
  },
  get : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    return res.status(200).send(user);
  },
  getFull : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId },
      relations: ["worksExp", "etudes", 'skills', 'references', 'languageSkills'] 
    });
    return res.status(200).send(user);
  },
  addEmptyWork : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    const wRepository = req.DB.getRepository(Works_exp);
    let we = new  Works_exp ();
    we.userCv = user ;
    we = await wRepository.save(we);
    return res.status(200).send(we);
  },
  delWork : async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(Works_exp);
      const id = req.params.id;
      const d = await Repository.delete(id);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  editWork : async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(Works_exp);
      const d = await Repository.save(req.body);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },

  // 
  addEmptyEtude : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    const wRepository = req.DB.getRepository(Etudes);
    let we = new  Etudes ();
    we.userCv = user ;
    we = await wRepository.save(we);
    return res.status(200).send(we);
  },
  delEtude: async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(Etudes);
      const id = req.params.id;
      const d = await Repository.delete(id);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  editEtude : async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(Etudes);
      const d = await Repository.save(req.body);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },

  addEmptyRef : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    const wRepository = req.DB.getRepository(References);
    let we = new  References ();
    we.userCv = user ;
    we = await wRepository.save(we);
    return res.status(200).send(we);
  },
  delRef: async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(References);
      const id = req.params.id;
      const d = await Repository.delete(id);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  editRef: async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(References);
      const d = await Repository.save(req.body);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  addLang : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    const wRepository = req.DB.getRepository(LanguageSkills);
    let we = new  LanguageSkills ();
    console.log(req.body);
    we.name = req.body.name;
    we.proficiency = req.body.prof;
    we.userCv = user ;
    we = await wRepository.save(we);
    return res.status(200).send(we);
  },
  delLang: async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(LanguageSkills);
      const id = req.params.id;
      const d = await Repository.delete(id);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  addSkill : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      where: { keycloakId }
    });
    const wRepository = req.DB.getRepository(Skills);
    let we = new  Skills ();
    console.log(req.body);
    we.name = req.body.name;
    we.years = req.body.exp;
    we.userCv = user ;
    we = await wRepository.save(we);
    return res.status(200).send(we);
  },
  delSkill: async (req: Request, res: Response) => {
    try {
      const Repository = req.DB.getRepository(Skills);
      const id = req.params.id;
      const d = await Repository.delete(id);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  addDoc : async (req: any, res: Response) => {

    const keycloakId = req.payload?.sub;
    const wRepository = req.DB.getRepository(Documents);
    let we = new  Documents ();
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.'});
    }
    we.type_doc = req.body.type_doc;
    we.name = req.body.name;
    we.keycloakId = keycloakId;
    we.mime = req.file.mimetype;
    we.data =  req.file.buffer;
    we.size = req.file.size;
    we = await wRepository.save(we);
    return res.status(200).send(we);
  },
  delDoc: async (req: Request, res: Response) => {
  try {
      const Repository = req.DB.getRepository(Documents);
      const id = req.params.id;
      const d = await Repository.delete(id);
      return res.status(200).send(d);
   } catch(e){
    console.log(e);
    return res.status(404).send(e);
  }
  },
  getDoc: async (req: Request, res: Response) => {

    try {
      const userRepository = req.DB.getRepository(Documents);
      const keycloakId = req.payload?.sub;
      const doc = await userRepository.findOne({
        where: { keycloakId }
      });
      let buffer = null;
      let mime = 'image/png';
      buffer = doc.data;
      mime = doc.mime;
      res.contentType(mime);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  getAllDocs: async (req: Request, res: Response) => {
    try {
      const userRepository = req.DB.getRepository(Documents);
      const keycloakId = req.payload?.sub;
      const docs = await userRepository.find({
        select: ['id', 'type_doc','mime', 'size','name'] ,
        where: { keycloakId }
      });
      return res.status(200).send(docs);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  edit : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    let userToUpdate = await userRepository.findOne({
      where: { keycloakId }
    });
    userRepository.merge(userToUpdate, req.body);
    userToUpdate = await userRepository.save(userToUpdate);
    return res.status(200).send(userToUpdate);
  },
  changeAvatar : async (req: any, res: Response) => {

    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;
    const user = await userRepository.findOne({
      select: ['id'] ,
      where: { keycloakId }
    });

    const aRepository = req.DB.getRepository(Avatar);

    let we : Avatar = await aRepository.findOne({
      where: {  id_user : user.id }
    });

    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.'});
    }
    if(!we) {
      we = new Avatar();
      we.id_user = user.id;
    }
   
    we.mime = req.file.mimetype;
    we.data =  req.file.buffer;
    console.log(we);
    we = await aRepository.save(we);
    return res.status(200).send(we);
  },
  avatar: async (req: Request, res: Response) => {
    try {
      const avatarRepository = req.DB.getRepository(Avatar);
      const avatar: Avatar = await avatarRepository.findOne({
        where: { id_user: req.params.id }
      });
      let buffer = null;
      let mime : any = 'image/png';
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
        buffer = Buffer.from(DefaultLogo, 'base64');
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
  changeLogo : async (req: any, res: Response) => {

    const id = req.params.id; 
    const keycloakId = req.payload?.sub;    
    const { GATEWAY_URL } = process.env;
    const http = new Http(axios, req.token || '');
    const path = getService("users").path;
    const URL = GATEWAY_URL+path+SERV_EP.getEntById+id;
    const ent  = await http.get(URL, false);

    if (ent.userId != keycloakId )   return res.status(401).send({ message: "Vous n'avez pas les droits de modifier cette entreprise."});
    
    const aRepository = req.DB.getRepository(Logo);

    let we : Logo = await aRepository.findOne({
      where: {  id_ent : id }
    });

    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.'});
    }
    if(!we) {
      we = new Logo();
      we.id_ent = id;
    }
   
    we.mime = req.file.mimetype;
    we.data =  req.file.buffer;
    console.log(we);
    we = await aRepository.save(we);
    return res.status(200).send(we);
  },
  apply : async (req: any, res: Response) => {
    const pRepository = req.DB.getRepository(Postulants);
   
    const id = req.body.id_job;
    const keycloakId = req.payload?.sub;
    const pos = await pRepository.find({
      where: { keycloakId, id_job: id  }
    });

    if (pos.length>0) {
      return res.status(500).send({ message: 'Vous avez déjà postulé pour ce poste.' , data: pos[0] });
    }
    const wRepository = req.DB.getRepository(Jobs);

    const job = await wRepository.find({
      select: ['id','entreprise_id'] ,
      where : { id }
    })
    console.log(job.entreprise_id);
    if (job.length==0) {
       return res.status(404).send({ message: 'Emploi non trouvé.'});
    }
    // if (!job[0].publish) {
    //  return res.status(500).send({ message: 'emploi Suspendu.'});
    // }
    let we = new  Postulants ();
    we.keycloakId = keycloakId;
    we.id_job = id ;
    we.id_certificat_doc = req.body.id_ct;
    we.id_cv_doc = req.body.id_cv;
    we.id_diplome_doc = req.body.id_dip;
    we.id_lm_doc = req.body.id_lm;
    we.entreprise_id = job[0].entreprise_id;
    we = await pRepository.save(we);
    return res.status(200).send(we);
  },
  candidature : async (req: any, res: Response) => {
    const pRepository = req.DB.getRepository(Postulants);
    const id = req.params.id;
    const keycloakId = req.payload.sub;
    const pos = await pRepository.find({
      where: { keycloakId, id_job: id  }
    });
    return res.status(200).send(pos);
  },
  dashboard : async (req: any, res: Response) => { 
    const id = req.payload.sub;
    //   where: { keycloakId, id_job: id  }
    // });
    const results = await req.DB.getRepository(Postulants)
        .createQueryBuilder("t1")
        .from(Jobs, "t2") // Jointure cartésienne
            .select([
              "t1.created_at as created_at",
              "t1.id as id",
              "t1.id_job as id_job",
              "t2.titre_job as titre_job",
              "t2.categorie as categorie",
              "t2.type_contrat as type_contrat",
              "t1.id_cv_doc as cv",
              "t1.id_lm_doc as lm",
              "t1.id_diplome_doc as diplome",
              "t1.id_certificat_doc as certificat",
          ])
        .where("t2.closed = false AND t1.id_job = t2.id AND t1.keycloakId='"+id+"' AND t1.etat_demande!='"+Etat_demande.rejetté+"'  ") // Clause WHERE basée sur une colonne commune
        .getRawMany();
    return res.status(200).send(results);
  },

  entreprises : async (req: Request, res: Response) => {
    try {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token+'');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getAllWithAdressPage;
      const data = await http.getSec(URL);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  editAdresse : async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token+'');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.editAdresse+id;
      const data = await http.postSec(URL, req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addAdresse : async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token+'');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.addAdresse+id;
      const data = await http.postSec(URL, req.body);
      
     return  res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  delEntreprise : async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token+'');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.delEntreprise+id;
      const data = await http.deleteSec(URL);

      const jobsRepository = req.DB.getRepository(Jobs);
      const objs: Jobs [] = await jobsRepository.find({
         where: { entreprise_id: id }
      });
      await jobsRepository.remove(objs);
      return res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  editEntreprise : async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token+'');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.editEntreprise+id;
      const data = await http.postSec(URL, req.body);
      return res.send(data);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getCVForRecuiter : async (req: Request, res: Response) => {
    const userRepository = req.DB.getRepository(User_Cv);
    const id = req.params?.id;
    const user = await userRepository.findOne({
      where: { id },
      relations: ["worksExp", "etudes", 'skills', 'references', 'languageSkills'] 
    });
    return res.status(200).send(user);
  },
  getDocById: async (req: Request, res: Response) => {

    try {
      const userRepository = req.DB.getRepository(Documents);
      const id = req.params.id;
      const doc = await userRepository.findOne({
        where: { id }
      });
      let buffer = null;
      let mime = 'image/png';
      buffer = doc.data;
      mime = doc.mime;
      res.contentType(mime);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  completion: async (req: Request, res: Response) => {

    try {
    const userRepository = req.DB.getRepository(User_Cv);
    const keycloakId = req.payload?.sub;

    const user: User_Cv = await userRepository.findOne({
      where: { keycloakId },
      relations: ["worksExp", "etudes", 'skills', 'references', 'languageSkills'] 
    });

    let note: any = 0;

    const  filler = {
      works : false,
      etudes : false,
      skills : false,
      language: false,
      name : false,
      titreAndProfile: false,
      profLen: false,
      phone: false ,
      email: false
    };

    if (user.languageSkills && user.languageSkills.length > 0) {
      note +=5; 
      filler.language = true;
    }

    if (user.email_contact && user.email_contact ) {
      note +=10;
      filler.email = true;
    }

    if (user.telephone_a || user.telephone_b ) {
      note +=10;
      filler.phone = true;
    }

    if (user.title_prof && user.profile) {
        note +=10;
        filler.titreAndProfile = true;
    }

    if (user.profile && user.profile.length>200) {
      note +=15;
      filler.profLen = true;
    }

    if (user.firstName && user.lastName) {
      note +=20;
      filler.name = true;
    }

    if (user.worksExp && user.worksExp.length>0) {
      note +=10;
      filler.works = true;
    }

    if (user.etudes && user.etudes.length>0) {
        note +=10;
        filler.etudes = true;
    }

    if (user.skills && user.skills.length>0) {
        note +=10;
        filler.skills = true;
    }
    res.status(200).send({ note, filler, total: 100 });

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  editPassword : async (req: Request, res: Response) => {
    try {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token+'');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.editPassword;
      const data = await http.postSec(URL, req.body);
      return res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  refresh: async (req: Request, res: Response) => {
    res.status(200).send({ message : "login" });
  },
  contact: async (req: Request, res: Response) => {
    const dao = req.DB.getRepository(Contact);
    let c : Contact = new Contact();
    c.full_name = req.body.full_name;
    c.email = req.body.email;
    c.subject = req.body.subject;
    c.message= req.body.message;
    const pay = { timestamp: new Date().getTime() }
    c = await dao.save(c);
    res.status(200).send(c);
  },
  generateToken: (data: any , key: any) => {
    const token = jwt.sign(data, key);
    return token;
  },
  verifyToken: (token: any, key: any) => {
    try {
      const decoded = jwt.verify(token, key);
      return { error: false, decoded};
    } catch (error: any) {
      console.error('Token verification failed:', error.message);
      return { error: true};
    }
  },

};
export default services;