import axios from 'axios';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Request,
  Response,
} from 'express';
import * as jwt from 'jsonwebtoken';

import { ILike } from 'typeorm';
import {
  Http,
  SERV_EP,
} from '../../../../common/index/Http';
import { getService } from '../../../../common/index/services';
import MailService from '../../../../common/mail/MailService';
import { Contact } from '../entity/Contact';
import { Jobs } from '../entity/Jobs';
import { Postulants } from '../entity/Postulants';
import { User_Cv } from '../entity/User_Cv';

export const NPage = 5;
const services = {
  getJobForHomePage : async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const objs: Jobs [] = await jobsRepository.find({
        order: { created_at : "DESC" },
        select: ['id','titre_job', 'categorie', 'ville','type_contrat', 'entreprise_id'],
        where : { publish : true}, // Specify the fields you want to select
        take: 18
    });

    let  ents: any [] = [];
    if(objs.length>0) {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token || '');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getListEntById;
      const ids = objs.map(jobs => jobs.entreprise_id);
      console.log(ids);
      ents = await http.post(URL, { ids : ids } ,false);
    }
    res.send({ objs, ents});
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  getAll : async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const objs: Jobs = await jobsRepository.find({
        order: { created_at : "DESC" },
      });
      res.send(objs);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  getEntById : async (req: Request, res: Response) => {
    const id = req.params.id;
    try {      
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token || '');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getEntById+id;
      const ents = await http.get(URL, false);
      res.send({  entreprise : ents });
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
getJobById : async (req: Request, res: Response) => {
  try {
    const jobsRepository = req.DB.getRepository(Jobs);
    const id = req.params.id;
    const obj: Jobs = await jobsRepository.findOne({
      where: { id }
    });
    const { GATEWAY_URL } = process.env;
    const http = new Http(axios, req.token || '');
    const path = getService("users").path;
    const URL = GATEWAY_URL+path+SERV_EP.getEntById+obj.entreprise_id;
    const ent = await http.get(URL, false);
    res.send({ job: obj, entreprise : ent });
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
},
 home : (req: Request, res: Response) => {
  return res.send({ message: "Home entreprises" });
},
  add : async (req: Request, res: Response) => {
 
    try {
      const keycloakId = req.payload?.sub;
      const jobsRepository = req.DB.getRepository(Jobs);
      const job = req.body.job;
      const ent = req.body.ent;
      const ad = req.body.ad;
      let obj = new Jobs();
      obj.app_Reception = job.app_reception;
      obj.titre_job = job.titre_job;
      obj.categorie = job.categorie;
      obj.date_echeance = job.date_echeance;
      obj.job_permanent = (job.date_echeance) ? false : true;
      obj.type_contrat = job.type_contrat;
      obj.env_de_travail = job.env_de_travail;
      obj.horaire_de_travail = job.horaire_de_travail;
      obj.periode_salaire = job.periode_salaire;
      obj.currency = job.currency;
      obj.salaire = job.salaire;
      obj.description = job.description;
      obj.lien_to_apply = job.lien_to_apply;
      obj.email_to_apply = job.email_to_apply;
      obj.phone_to_apply = job.phone_to_apply;
      obj.entreprise_id = ent.id;
      obj.create_by = keycloakId;
      obj.is_certificat_require = job.is_certificat_require;
      obj.is_cv_require = job.is_cv_require;
      obj.is_diplome_require = job.is_diplome_require;
      obj.is_lm_require = job.is_lm_require;

      const cadd = ent.adresses.find( (item: { id: any; }) => { return item.id == ad } );
      obj.country = cadd.country;
      obj.etat = cadd.etat;
      obj.ville = cadd.ville;
      obj.publish = job.publish;
      obj = await jobsRepository.save(obj);
      res.send(obj);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  getJobs : async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const objs: Jobs [] = await jobsRepository.find({
        order: { created_at : "DESC" },
        // Specify the fields you want to select
        take: NPage // Limit the result to 6 rows
    });
    let  ents: any [] = [];
    if(objs.length>0) {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token || '');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getListEntById;
      const ids = objs.map(jobs => jobs.entreprise_id);
      console.log(ids);
      ents = await http.post(URL, { ids : ids } ,false);
    }

    const objs2 = await jobsRepository.count();
    const totalPage =  Math.ceil(objs2/NPage);
    const pages = [];
    for(let i = 1; i<= totalPage; i++) {
      pages.push(i);
    }
    const pagination = { numberJobs : objs2,totalPage, pages,currentPage: 1 };
    res.send({ objs, ents, pagination});
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },

  getJobsFilter : async (req: Request, res: Response) => {
    try {
      const {
        query ,
        location,
        categorie,
        type_contrat,
        env,
        horaire
      } = req.body;

      const page = Number(req.params.page);
      const jobsRepository = req.DB.getRepository(Jobs);
      const queryBuilder = jobsRepository.createQueryBuilder('job');
      if (query ) {
        queryBuilder.orWhere( {titre_job: ILike(`%${query}%`)  });
        queryBuilder.orWhere( {description : ILike(`%${query}%`) });
       }   
  
       if (location ) {
        queryBuilder.orWhere({ville : ILike(`%${location}%`) });
        queryBuilder.orWhere( {etat: ILike(`%${location}%`) });
       }   
       if(categorie){
           queryBuilder.andWhere({categorie: ILike(`%${categorie}%`) });
       }
       if(type_contrat){
          queryBuilder.andWhere({type_contrat: type_contrat });
       }
       if(env) {
          queryBuilder.andWhere({ env_de_travail: env  });
       }
       if(horaire){
          queryBuilder.andWhere( { horaire_de_travail: horaire });
       }
      const skip = (page - 1) * NPage;
      const objs: Jobs [] = await queryBuilder
      .orderBy("job.created_at", "DESC")
      .skip(skip)
      .take(NPage)
      .getMany();
    let  ents: any [] = [];
    if(objs.length>0) {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token || '');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getListEntById;
      const ids = objs.map(jobs => jobs.entreprise_id);
      ents = await http.post(URL, { ids : ids } ,false);
     }
     res.send({ objs, ents});
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },

  getJobsFilterSearch : async (req: Request, res: Response) => {
    try {
      const {
          query ,
          location,
          categorie,
          type_contrat,
          env,
          horaire
        } = req.body;
      const jobsRepository = req.DB.getRepository(Jobs);
      const queryBuilder = jobsRepository.createQueryBuilder('job');
      if (query ) {
        queryBuilder.orWhere( { titre_job: ILike(`%${query}%`)  });
        queryBuilder.orWhere( { description : ILike(`%${query}%`) });
       }   
  
       if (location ) {
        queryBuilder.orWhere({ville :ILike(`%${location}%`) });
        queryBuilder.orWhere( {etat: ILike(`%${location}%`) });
       }   
  
        if(categorie){
           queryBuilder.andWhere({categorie: ILike(`%${categorie}%`) });
        }
  
        if(type_contrat){
          queryBuilder.andWhere({type_contrat: type_contrat });
        }
        if(env) {
          queryBuilder.andWhere({ env_de_travail: env  });
        }
        if(horaire){
          queryBuilder.andWhere( { horaire_de_travail: horaire });
        }
    
    const objs2 = await queryBuilder.getCount();

    const objs: Jobs [] = await queryBuilder
    .orderBy("job.created_at", "DESC")
    .skip(0)
    .take(NPage)
    .getMany();

    let  ents: any [] = [];
    if(objs.length>0) {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token || '');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getListEntById;
      const ids = objs.map(jobs => jobs.entreprise_id);
      console.log(ids);
      ents = await http.post(URL, { ids : ids } ,false);
    }

    const totalPage =  Math.ceil(objs2/NPage);
    const pages = [];
    for(let i = 1; i<= totalPage; i++) {
      pages.push(i);
    }
    const pagination = { numberJobs : objs2,totalPage, pages,currentPage: 1 };
    res.send({ objs, ents, pagination});
    } catch (error) {
      const pagination = { numberJobs : 0 ,totalPage: 0, pages: [], currentPage: 1 };
      res.send({ objs : [], ents : [], pagination});
    }
  },
  getJobByIdEnt : async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const id = req.params.id;
      const page = Number(req.params.page);
      const skip = (page - 1) * NPage;
      const jobs : Jobs = await jobsRepository.find({
        order: { created_at : "DESC" },
        skip : skip,
        take: NPage,
        where: { entreprise_id: id }
      });

    const objs2 = await jobsRepository.count({
      where: { entreprise_id: id }
    });
    const totalPage =  Math.ceil(objs2/NPage);
    const pages = [];
    for(let i = 1; i<= totalPage; i++) {
      pages.push(i);
    }
    const pagination = { numberJobs : objs2,totalPage, pages, currentPage: page };
      res.send({ jobs, pagination });
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  getMyJob:  async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const id = req.params.id;
      const keycloakId = req.payload?.sub;
      const job: Jobs = await jobsRepository.findOne({
        where: { id: id }
      });
      if (job.create_by != keycloakId) return res.status(500).send({});
      return res.send(job);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },

  edit : async (req: Request, res: Response) => {
 
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const id = req.params.id;
      const keycloakId = req.payload?.sub;
      let obj: Jobs = await jobsRepository.findOne({
        where: { id: id }
      });
      if (obj.create_by != keycloakId) return res.status(500).send({message: "Vous n'avez pas le droit de modifier cet poste."});
      const job = req.body;

      obj.app_Reception = job.app_Reception;
      obj.date_echeance = job.date_echeance;
      obj.job_permanent = (job.date_echeance) ? false : true;
      obj.type_contrat = job.type_contrat;
      obj.env_de_travail = job.env_de_travail;
      obj.horaire_de_travail = job.horaire_de_travail;
      obj.periode_salaire = job.periode_salaire;
      obj.currency = job.currency;
      obj.salaire = job.salaire;
      obj.description = job.description;
      obj.lien_to_apply = job.lien_to_apply;
      obj.email_to_apply = job.email_to_apply;
      obj.phone_to_apply = job.phone_to_apply;
      obj.create_by = keycloakId;
      obj.is_certificat_require = job.is_certificat_require;
      obj.is_cv_require = job.is_cv_require;
      obj.is_diplome_require = job.is_diplome_require;
      obj.is_lm_require = job.is_lm_require;
      obj.publish =  job.publish;
      obj = await jobsRepository.save(obj);
      res.send(obj);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  active :  async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const id = req.params.id;
      const keycloakId = req.payload?.sub;
      const job: Jobs = await jobsRepository.findOne({
        where: { id: id }
      });

      if (job.create_by != keycloakId) return res.status(500).send({});

      job.publish = req.body.publish;
      await jobsRepository.save(job);
      return res.send(job);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  getJobByIdEntNoPage : async (req: Request, res: Response) => {
    try {
      const jobsRepository = req.DB.getRepository(Jobs);
      const id = req.params.id;
      const jobs : Jobs = await jobsRepository.find({
        order: { created_at : "DESC" },
        select: ["id", "titre_job", "categorie"],
        where: { entreprise_id: id }
      });
      res.send(jobs);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  getPostByIdJob: async (req: any, res: Response) => {
    const id = req.params.id;
    const state = req.params.state as boolean | string;
    const page = Number(req.params.page);
    const skip = (page - 1) * NPage;
    let wh = "t1.keycloakId = t2.keycloakId AND t1.id_job='"+id+"'"; 
    if (state!=false && state!="false") {
        wh = "t1.keycloakId = t2.keycloakId AND t1.id_job='"+id+"' AND t1.etat_demande='"+state+"' " ;
    }
    const cands = await req.DB.getRepository(Postulants)
        .createQueryBuilder("t1")
        .from(User_Cv, "t2") // Jointure cartésienne
            .select([
              "t1.created_at as created_at",
              "t1.id as id",
              "t1.id_job as id_job",
              "t1.id_cv_doc as cv",
              "t1.id_lm_doc as lm",
              "t1.id_diplome_doc as diplome",
              "t1.id_certificat_doc as certificat",
              "t1.etat_demande as etat_demande",
              "t1.created_at as date_created",
              "t2.id as id_postulant",
              "t2.lastName as lastname",
              "t2.firstName as firstName",
          ])
        .where(wh) // Clause WHERE basée sur une colonne commune
        .skip(skip)
        .take(NPage)
        .getRawMany();

        const objs2 = await req.DB.getRepository(Postulants)
        .createQueryBuilder("t1")
        .from(User_Cv, "t2") // Jointure cartésienne
            .select([
              "t1.id as id_cand",
          ])
        .where(wh) // Clause WHERE basée sur une colonne commune
        .getCount();

        const totalPage =  Math.ceil(objs2/NPage);
        const pages = [];
        for(let i = 1; i<= totalPage; i++) {
          pages.push(i);
        }
        const pagination = { numberJobs : objs2,totalPage, pages, currentPage: page };
        return res.status(200).send({ cands  , pagination});
  },
  changeState :  async (req: any, res: Response) => {
    try {
      const postRepository = req.DB.getRepository(Postulants);
      const id = req.body.id;

      let item: Postulants = await postRepository.findOne({
        where: { id: id }
      });

      const create_by = req.payload?.sub;

      const jobsRepository = req.DB.getRepository(Jobs);
      const job: Jobs = await jobsRepository.findOne({
        select: ["create_by", "id"],
        where: { create_by: create_by, id: item.id_job }
      });

      if (!job) return res.status(500).send({ message: "Vous n'avez pas le droit pour faire ce changement"});

      item.etat_demande = req.body.state;

      item = await postRepository.save(item);
      return res.send(item);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
  },
  countEntAndJob : async (req: any, res: Response) => {
    const { GATEWAY_URL } = process.env;
    const http = new Http(axios, req.token || '');
    const path = getService("users").path;
    const keycloakId = req.payload?.sub;
    const URL = GATEWAY_URL+path+SERV_EP.countEntreprise+"/"+keycloakId;
    const cents = await http.get(URL, false);
    return res.status(200).send(cents);
  },
  count : async (req: any, res: Response) => {
    const keycloakId = req.payload?.sub;
    const jobsRepository = req.DB.getRepository(Jobs);
    const job: Jobs = await jobsRepository.count({
      select: ["create_by", "id"],
      where: { create_by: keycloakId }
    });

    const wh = "t1.id_job = t2.id AND t2.create_by ='"+keycloakId+"'"; 
    const post = await req.DB.getRepository(Postulants)
    .createQueryBuilder("t1")
    .from(Jobs, "t2") // Jointure cartésienne
    .where(wh) // Clause WHERE basée sur une colonne commune
    .getCount();

  
    const { GATEWAY_URL } = process.env;
    const http = new Http(axios, req.token || '');
    const path = getService("users").path;
    const URL = GATEWAY_URL+path+SERV_EP.countAdresse+keycloakId;
    const data = await http.get(URL, false);
    return res.status(200).send({ job, post, ad: data.post });
  },

  mail : async (req: any, res: Response) => {
     const data = MailService.test(req);
     return res.status(200).send({ data });
  },

  report : async (req: any, res: Response) => {
    try {
      const id = req.params.id;
      const keycloakId = req.payload?.sub;

      const contRepository = req.DB.getRepository(Contact);
      const cont: Contact = await contRepository.findOne({
        where: { id_job: id, keycloakId  }
      });

      if (cont) return res.status(409).send({ error: true, message : "Vous avez déjà signalé ce poste." });

      const jobsRepository = req.DB.getRepository(Jobs);
      const job: Jobs = await jobsRepository.findOne({
        where: { id: id }
      });

      if (!job) return res.status(404).send({ error: true, message : "Job non trouvé" });

      const userRepository = req.DB.getRepository(User_Cv);
      const user: User_Cv = await userRepository.findOne({
        where: { keycloakId }
      });

      if (!user) return res.status(404).send({ error: true, message : "Utilisateur non trouvé" });

     
      const pay = { id, keycloakId,  timestamp: new Date().getTime() };
      const token = services.generateToken(pay, "REPORT_KEY");
      let c: Contact = new Contact();
      c.full_name = user.firstName +" "+ user.lastName;
      c.email = user.email_contact;
      c.id_job = id;
      c.keycloakId = keycloakId;
      c.token = token;
      c.subject = "Job Report";
      c.message = "Quelqu'un a signalé ce poste : " +job.titre_job+". ";
      c = await contRepository.save(c);
      return res.send(c);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
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
  getJobsFilterSearchForAdmin : async (req: Request, res: Response) => {

    const NPage = 10;
    const page = Number(req.params.page);
    const skip = (page - 1) * NPage;
    try {
      const {
          query ,
      } = req.body;
      const jobsRepository = req.DB.getRepository(Jobs);
      const queryBuilder = jobsRepository.createQueryBuilder('job');
      if (query ) {
        queryBuilder.orWhere( { titre_job: ILike(`%${query}%`)  });
        queryBuilder.orWhere({ categorie: ILike(`%${query}%`) });
        queryBuilder.orWhere({ ville :ILike(`%${query}%`) });
        queryBuilder.orWhere( { etat: ILike(`%${query}%`) });
       }   
    const objs2 = await queryBuilder.getCount();
    
    const objs: Jobs [] = await queryBuilder
    .select(['job.created_at','job.id','job.titre_job', 'job.categorie', 'job.ville','job.type_contrat', 'job.entreprise_id','job.date_echeance','job.publish', 'job.block_by_admin'])
    .orderBy("job.created_at", "DESC")
    .skip(skip)
    .take(NPage)
    .getMany();
    let  ents: any [] = [];
    if(objs.length>0) {
      const { GATEWAY_URL } = process.env;
      const http = new Http(axios, req.token || '');
      const path = getService("users").path;
      const URL = GATEWAY_URL+path+SERV_EP.getListEntById;
      const ids = objs.map(jobs => jobs.entreprise_id);
      console.log(ids);
      ents = await http.post(URL, { ids : ids } ,false);
    }

    const totalPage =  Math.ceil(objs2/NPage);
    const pages = [];
    for(let i = 1; i<= totalPage; i++) {
      pages.push(i);
    }
    const pagination = { numberJobs : objs2,totalPage, pages,currentPage: page };
    res.send({ objs, ents, pagination});
    } catch (error) {
      const pagination = { numberJobs : 0 ,totalPage: 0, pages: [], currentPage: page };
      res.send({ objs : [], ents : [], pagination});
    }
  },
  getStats: async (req: Request, res: Response) => {

    const objRepository = req.DB.getRepository(Jobs);
    const queryBuilder2 = objRepository.createQueryBuilder('jobs');
    const objs = await queryBuilder2.getCount();

    const objRepository2 = req.DB.getRepository(Postulants);
    const queryBuilder = objRepository2.createQueryBuilder('Postulants');
    const objs2 = await queryBuilder.getCount();
    return res.send({ total_jobs: objs, total_postulant: objs2 });

  }
};
export default services;