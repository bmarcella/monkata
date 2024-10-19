import { ApplicantAno } from "../entity/Anonimous/ApplicantAno";
import { UserAno } from "../entity/Anonimous/UserAno";
import { Jobs } from "../entity/Jobs";

export const MessageMailJob = (user: UserAno , app: ApplicantAno, job: Jobs,)=>{
  return ` 
Cher/ère Recruteur/se,
Nous souhaitons vous informer que vous avez reçu une candidature pour le poste de “${job.titre_job}” via la plateforme MEMPLOI.COM.
Nom : ${user.lastName}
Prénom : ${user.firstName}
Email : ${user.email}
Téléphone : ${user.telephone}
Veuillez trouver ci-joint son dossier complet ci-joint pour votre évaluation. Memploi agit uniquement en tant qu’intermédiaire pour la diffusion des offres d’emploi. 
Nous facilitons la mise en relation entre les candidats et les employeurs, mais la responsabilité de l'évaluation et du choix final des candidats vous incombe entièrement.
Nous n'intervenons pas dans le processus de sélection et ne pouvons pas confirmer la qualité ou la performance des candidats.
Pour faciliter la gestion de vos offres et le tri des candidatures reçues, nous vous invitons à créer un compte entreprise via ce lien : https://memploi.com/jobs/add-ent.
${user.firstName} ${user.lastName} est en copie de cet email pour référence et se tient à votre disposition pour toute information complémentaire.
Cordialement,
L’équipe MEMPLOI.COM 
P.S. Pour les candidats qui n'ont pas encore de compte sur MEMPLOI.COM, voici le lien pour rejoindre notre communauté de milliers de professionnels : https://memploi.com/profile/cv.`;
};
