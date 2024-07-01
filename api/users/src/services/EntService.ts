/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Entreprise } from "../entity/Entreprise";
import { Adresse } from "../entity/Adresse";
import { In } from "typeorm";

export const monkata_auth_url = "auth";
const services = {
  changeLogo: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: { userId: keycloakId }
      });
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  update: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: { userId: keycloakId }
      });
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  delete: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const id = req.params.id;
      console.log("ID_ENT -> ",id);
      const entrepriseRepository = req.DB.getRepository(Entreprise);

      const one = await entrepriseRepository.findOne({
        where: { id : id  },
        relations: ["adresses"]
      });

      if (one.keycloakId !== keycloakId ) res.status(500).send({ message: "Vous ne pouvez pas supprimer cette entreprise!" });
      const adresseRepository = req.DB.getRepository(Adresse);

      if (one.adresses.length > 0) {
          await adresseRepository.remove(one.adresses);
      }
      await entrepriseRepository.remove(one); 
      res.send({ message: "success" });
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  getAllForAdmin: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: { userId: keycloakId }
      });
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  getAll: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: { userId: keycloakId }
      });
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  getAllWithAdress: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: { userId: keycloakId },
        relations: ["adresses"] 
      });
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  add: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const cents = await entrepriseRepository.count({
        where: { userId: keycloakId }
      });

      let   ents = new Entreprise();
      ents.name = req.body.name;
      ents.description = req.body.description;
      ents.telephone_a = req.body.telephone_a;
      ents.telephone_b = req.body.telephone_b;
      ents.email_contact = req.body.email_contact;
      let  add = new Adresse();
      const adRepository = req.DB.getRepository(Adresse);
      add.name = (cents>0) ?"Area_"+ new Date() : "Central";
      add.default = (cents>0) ? true : false;
      add.country = req.body.adresse.country;
      add.etat = req.body.adresse.state;
      add.rue = req.body.adresse.street;
      add.etat = req.body.adresse.state;
      add = await adRepository.save(add);
      ents.userId = keycloakId;
      ents.adresses = [add];
      ents = await entrepriseRepository.save(ents);
      // add.entreprise = ents;
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  getById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ent = await entrepriseRepository.findOne({
        where: { id }
      });
      res.send(ent);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },

  getListById: async (req: Request, res: Response) => {
    try {
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: {
            id: In(req.body.ids) 
        }
    });
      res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  getAllWithAdressPage: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.payload?.sub;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ents = await entrepriseRepository.find({
        where: { userId: keycloakId },
        relations: ["adresses"] 
      });

      return res.send(ents);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  editAdresse: async (req: Request, res: Response) => {
    try {
      const adRepository = req.DB.getRepository(Adresse);
      const id = req.params.id ;
      let ad : Adresse = await adRepository.findOne({
        where: {
            id 
        }
    });
    console.log("DATA", req.body);
    ad.name = req.body.name;
    ad.country = req.body.country;
    ad.ville = req.body.ville;
    ad.rue = req.body.rue;
    ad.etat = req.body.etat;
    ad = await adRepository.save(ad);
    res.send(ad);
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  addAdresse: async (req: Request, res: Response) => {
  try {
      const entRepository = req.DB.getRepository(Entreprise);
      const ent = await entRepository.findOne({
        where: { id: req.params.id }
      });
      const adRepository = req.DB.getRepository(Adresse);
      let ad = new  Adresse ();
      ad.name = req.body.name;
      ad.country = req.body.country;
      ad.ville = req.body.ville;
      ad.rue = req.body.rue;
      ad.etat = req.body.etat;
      ad.default = false;
      ad.entreprise = ent;
      ad = await adRepository.save(ad);
      return res.send(ad);
  } catch (error) {
      console.log(error)
      return res.status(500).send(error);
  }

  },
  edit: async (req: Request, res: Response) => {
    try {
      const entRepository = req.DB.getRepository(Entreprise);
      const keycloakId = req.payload?.sub;
      const id = req.params.id;
          let ents : Entreprise = await entRepository.findOne({
        where: { id }
      });

      if (ents.userId != keycloakId) res.status(500).send({ message : "UNAUTHORIZE", id_user : ents.userId, keycloakId : keycloakId  }); 
      const part = true ;
      if(part){
      ents.compagnie_size = req.body.compagnie_size;
      ents.website = req.body.website ;
      ents.telephone_a = req.body.telephone_a;
      ents.telephone_b = req.body.telephone_b;
      ents.email_contact = req.body.email_contact;
      ents.year_founded = req.body.year_founded;
      }

      if(part){
        ents.description = req.body.description;
        ents.slogan = req.body.slogan;
        ents.objectif = req.body.objectif;
        ents.vision = req.body.vision;
      }

      ents = await entRepository.save(ents);
      res.send(ents);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  count: async (req: Request, res: Response) => {
    try {
      const keycloakId = req.params.id;
      const entrepriseRepository = req.DB.getRepository(Entreprise);
      const ent = await entrepriseRepository.count({
        where: { userId: keycloakId }
      });
      console.log(ent)
      res.send({count: ent});
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
  countAdresse: async (req: Request, res: Response) => {
    try {
    const keycloakId = req.params.id;
    const wh = "t1.entreprise.id = t2.id AND t2.userId='"+keycloakId+"'"; 
    const post = await req.DB.getRepository(Adresse)
    .createQueryBuilder("t1")
    .from(Entreprise, "t2") // Jointure cartésienne
    .where(wh) // Clause WHERE basée sur une colonne commune
    .getCount();
     return res.send({post});
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }

  },
 
};
export default services;
