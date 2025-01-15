import {
  Sender,
  Subject,
} from './Sender';

const MailService = {
  name: "Memploi",
  newUser :  (data: any) => {
    try {
      const message = `Bonjour ${data.firstName},\n
        Bienvenue à ${data.app}! Nous sommes ravis de vous avoir parmi nous.\n
        Commencez par explorer la plateforme et découvrez des opportunités de travail passionnantes, adaptées spécialement pour vous.\n
        Si vous avez des questions, nous sommes là pour vous aider. \n \n
        Merci de vous être inscrit sur notre plateforme! Voici le code validation pour confirmer votre adresse e-mail et activer votre compte : \n
        ${data.code} \n
        Bonne recherche d'emploi! \n
        Cordialement,\n
        L'équipe Monkata Services`;
      return message;
    } catch (error) {
      throw error;
    }
  
  },
  test : async ( req : any) => {
    const m = new Sender(MailService.name, req.mail);
    m.config("bmarcella91@gmail.com", Subject.NEW_USER, "Yes, the script should work on your local machine as long as you have the necessary packages installed and the correct configuration settings." );
    return await m.exec();
   },

   reset_password : ( req : any, data: any) => {
    try {
      const message = `Bonjour ${data.firstName}\n
      Nous avons reçu une demande de réinitialisation de votre mot de passe.  Voici le code validation de la réinitialisation :
      ${data.code}\n
      Si vous n'avez pas demandé la réinitialisation du mot de passe, veuillez ignorer cet e-mail.\n
      Cordialement,\n
      L'équipe Monkata Services`;
      return message;
    } catch (error) {
       console.log(error);
       return undefined
    }
 
   },
   reset_password_success :  ( req : any, data: any) => {
    try {
    const message = `Bonjour ${data.firstName}\n
    Nous avons réinitialisé de votre mot de passe. \n
    L'équipe Monkata Services`;
    return message;
    } catch (error) {
      console.log(error);
      return undefined;
    }
    
   },
   
};
export default MailService;