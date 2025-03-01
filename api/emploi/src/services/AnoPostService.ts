/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  Request,
  Response,
} from 'express';
import FormData from 'form-data';
import { Http } from '../../../../common/index/Http';

import { MailData } from '../../../../common/mail/MailData';
import { ApplicantAno } from '../entity/Anonimous/ApplicantAno';
import { UserAno } from '../entity/Anonimous/UserAno';
import { Jobs } from '../entity/Jobs';
import { MessageMailJob } from './JobMail';
import { UserAnoFree } from '../entity/Anonimous/UserAnoFree';

export const NPage = 5;


const services = {
  addFree : async  (req: Request, res: Response) => {

    const files = req.files as  {[fieldname: string]: Express.Multer.File[]};
    // const files = req.files as  {[fieldname: string]: any[]};
    
    if (files['cv'][0] == undefined) {
      return res.status(400).send({ message: "Vous devez envoyer au moins votre cv." });
    }
    const cv = files['cv'][0];
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;

    const dao = req.DB.getRepository(UserAnoFree);
    // check user /
    const obj_2: UserAnoFree = await dao.findOne({
      where: { email }
    });

    if (obj_2) return res.status(200).send({ message: "Vous avez déjà enregistré votre dossier." });

    if (!obj_2) { 
    const  obj  = new UserAnoFree();
      obj.email = email;
      obj.firstName = firstName;
      obj.lastName = lastName;
      obj.telephone = phone;
      //
      obj.country = req.body.country;
      obj.city = req.body.city;
      obj.domaine_1 = req.body.domaine_1;
      obj.exp_1 = req.body.exp_1;
      obj.domaine_2 = req.body.domaine_2;
      obj.exp_2 = req.body.exp_2;
      obj.domaine_3 = req.body.domaine_3;
      obj.exp_3 = req.body.exp_3;
      obj.stage = req.body.stage;
      obj.benevolat = req.body.benevolat;
      obj.relocate = req.body.relocate;
      obj.salary_min = req.body.salary_min;
      obj.salary_max = req.body.salary_max;
      obj.niv_academique = req.body.niv_academique;
      obj.type_emp = req.body.type_emp;
  
      obj.cv_user =  cv.buffer;

      if (files['dc'] && files['dc'][0] != undefined) {
          const dc = files['dc'][0];
          obj.dc_user =  dc.buffer;
      }
     
      dao.save(obj);
      return res.status(200).send({ message: "Succès." });
    } 
 
  },
  add : async  (req: Request, res: Response) => {
    const id_job = req.body.id_job;
    const jobsRepository = req.DB.getRepository(Jobs);
    const id = id_job;
    const job: Jobs = await jobsRepository.findOne({
      where: { id }
    });
    let lm = undefined;
    if (job == undefined) {
      return res.status(400).send({ message: "Cet emploi n'existe pas!" });
    }
    const files = req.files as  {[fieldname: string]: Express.Multer.File[]};
    // const files = req.files as  {[fieldname: string]: any[]};
    
    if (files['cv'][0] == undefined) {
      return res.status(400).send({ message: "Vous devez envoyer au moins votre cv." });
    }
    const cv = files['cv'][0];
   

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;

    const email_job = req.body.email_job;
    const dao = req.DB.getRepository(UserAno);
    // check user /
    let obj: UserAno = await dao.findOne({
      where: { email }
    });
    if (!obj) { 
      obj  = new UserAno();
      obj.email = email;
      obj.firstName = firstName;
      obj.lastName = lastName;
      obj.telephone = phone;
    } else {
       if (obj.email!=email)  obj.email = email;
       if (obj.firstName!=firstName)   obj.firstName = firstName;
       if (obj.lastName!=lastName)   obj.lastName = lastName;
       if (obj.telephone!=phone)   obj.telephone = phone;
    }
    obj =  await dao.save(obj);
    // end check user 
    const dao2 = req.DB.getRepository(ApplicantAno);
    const  aa : ApplicantAno = new ApplicantAno();
    aa.userId = obj.id;
    aa.id_job = id_job;
    aa.email_job = email_job;
    aa.cv_user =  cv.buffer;
    if (files['lm'] && files['lm'][0] != undefined ) {
      lm = files['lm'][0];
      if(lm.buffer){
        aa.lm_user =  lm.buffer;
      } 
    }
    dao2.save(aa);
    services.sendMailWithFile(obj,aa,job, { cv, lm } );
    return res.status(200).send({ message: "Votre dossier de candidature a été transmis avec succès." });
  },
  sendMailWithFile: async (user: UserAno , app:ApplicantAno, job: Jobs, files: any)  => {
    return new Promise((resolve, err) => {
      try {
      const { MAIL_EP } = process.env;
    
      const data: MailData = {
        receiver: app.email_job,
        subject:`Candidature : ${job.titre_job} `,
        body: MessageMailJob(user, app, job),
        replyTo: user.email
      };

      const formData = new FormData();
      const cv = files.cv;
      const lm = files.lm;
      formData.append("cv", cv.buffer, cv.originalname);
      if(lm && lm.buffer!= undefined){
         formData.append("lm", lm.buffer, lm.originalname);
      }
      formData.append('receiver',data.receiver);
      formData.append('replyTo',data.replyTo);
      formData.append('postulant',user.lastName+" "+user.firstName);
      formData.append('subject',data.subject);
      formData.append('body',data.body);
      const http = new Http(axios, "");
      const h = formData.getHeaders();
      console.log(MAIL_EP+"",formData, h);
      http.formaData(MAIL_EP+"", formData,h );
     // const dao2 = req.DB.getRepository(ApplicantAno);
      app.send = 1;
      resolve(true);
      // dao2.save(app);
      } catch(e){
        console.error('Error uploading file:', e);
        err(e);
      }
  
    })
    
  

  },

  getFreeCand: async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    const skip = (page - 1) * NPage;
    const wh = "t1.userId = t2.id";
    const cands = await req.DB.getRepository(ApplicantAno)
        .createQueryBuilder("t1")
        .from(UserAno, "t2") // Jointure cartésienne
            .select([
              "t1.created_at as date_created",
              "t2.id as id_postulant",
              "t2.lastName as lastname",
              "t2.firstName as firstName",
              "t2.email as email",
              "t2.telephone as telephone",
          ])
        .where(wh) // Clause WHERE basée sur une colonne commune
        .skip(skip)
        .take(NPage)
        .getRawMany();

        const objs2 = await req.DB.getRepository(ApplicantAno)
        .createQueryBuilder("t1")
        .from(UserAno, "t2") // Jointure cartésienne
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

  }

};
export default services;