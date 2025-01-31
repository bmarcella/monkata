import { Bulletin } from '../Bulletin';
import { BulletinGen } from './BulletinGen';
import { Cours } from '../Cours';
import { Etab } from '../Etab';
import { Results } from '../Results';
import { User} from '../User';
import { PeriodGen } from './PeriodGen';

export class Acad {
  public token_bgen = "";
  annee: string;
  name: string;
  classe: string;
  public bulletins: BulletinGen[] = [];
  public periods: PeriodGen[];
  coef: number;
  etab: Etab;
  tools;
  showId;
  tmat;
  tcoef;
  tnote;
  tobj;
  tval;
  tbull;
  tut;
  textAlign;
  textPos;
  signa_di;
  signa_pa;
  signa_ti;
  smargin;
  heightImg;
  widthImg;
  posImg;
  headHeight;
  titreWidth;
  titreFontSize;
  detailFontSize;
  detailWidth;
  logoMarginTop;
  infoHeight;
  resultHeight;
  mentionHeight;
  signaHeight;
  fullname;
  tclasse;
  mentionMarginTop;
  tableWidth;
  mentionWidth;
  objWidth;
  token_b;
  pay;
  date_pay;
  valider;
  modif;
  msg_rep;
  msg_exc;
  msg_echec;
  msg_reu;
  max_cours;
  max_users;
  is_over;
  is_reprise;
  note_show;
  imageSrc: string | ArrayBuffer;
  detailsTextMt;
  heightb;
  widthb;
  orient;
  domaine;
  margint
  marginb;
  public bmarginb = 2;
  titreInfoSizetext;
  headTableTextsize;
  moy_classe;
   public constructor(annee, name, classe) {
    this.annee = annee;
    this.name = name;
    this.classe = classe;
    this.orient=true;
    this.max_cours = 50;
    this.max_users = 1000;
    this.pay = 0;
    this.token_b = null;
    this.valider = 0;
    this.annee = annee;
    this.name = name;
    this.classe = classe;
    this.coef = 10;
    this.tools = true;
    this.showId = true;
    this.tmat = 'Matieres';
    this.tcoef = 'Coéfficient';
    this.tnote = 'Note';
    this.tobj = 'Objets';
    this.tval = 'Valeur';
    this.tbull = 'Bulletin';
    this.tut = true;
    this.signa_di = 'Signature du directeur';
    this.signa_pa = 'Signature du parent';
    this.signa_ti = 'Signature du titulaire';
    this.smargin = 19;
    this.mentionMarginTop = 19;
    this.heightImg = 50;
    this.widthImg = 50;
    this.heightb = 100;
    this.widthb = 100;
    this.posImg = 'center';
    this.textAlign = 'center';
    this.textPos = '';
    this.headHeight = 13;
    this.titreWidth = 98;
    this.detailWidth = 98;
    this.logoMarginTop = 0;
    this.infoHeight = 11;
    this.resultHeight= 40;
    this.mentionHeight=10;
    this.signaHeight = 11;
    this.fullname = "Nom & Prénom";
    this.tclasse = "Classe";
    this.tableWidth = 99;
    this.mentionWidth = 48;
    this.objWidth = 99;
    this.titreFontSize = 25;
    this.detailFontSize = 15;
    this.modif = true;
    this.msg_rep ="";
    this.msg_exc ="Excelent(e)";
    this.msg_echec ="Echèc";
    this.msg_reu = "Réussite";
    this.is_over = "false";
    this.is_reprise = false;
    this.note_show = false;
    this.detailsTextMt = 1;
    this.headTableTextsize =12;
    this.titreInfoSizetext = 12;
    this.marginb = 0;
    this.margint = 0;
     this.domaine = "";
     this.tmg = "Moy.Gen.";
  }
  public  moy_classe_gen =0;
  public tmg = "";
  setEtab(etab: any) {
    this.etab = etab;
  }
}
