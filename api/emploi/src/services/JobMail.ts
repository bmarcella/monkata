import { ApplicantAno } from "../entity/Anonimous/ApplicantAno";
import { UserAno } from "../entity/Anonimous/UserAno";
import { Jobs } from "../entity/Jobs";

export const MessageMailJob = (user: UserAno , app: ApplicantAno, job: Jobs,)=>{
  return ` 
Cher/ère Recruteur/se,
Nous vous informons que ${user.firstName} ${user.lastName} (${user.email}) a récemment soumis sa candidature pour le poste de : ${job.titre_job} via la plateforme MEMPLOI.COM.
Veuillez trouver ci-joint son dossier complet pour votre évaluation. MEMPLOI.COM agit uniquement en tant qu’intermédiaire pour la diffusion des offres d’emploi en Haïti, en particulier pour les jeunes professionnels. 
Nous facilitons la mise en relation entre les candidats et les employeurs, mais la responsabilité de l'évaluation et du choix final des candidats vous incombe entièrement. MEMPLOI.COM n'intervient pas dans le processus de sélection et ne peut être tenu responsable de la qualité ou de la performance des candidats.
Pour faciliter la gestion de vos offres et le triage des candidatures reçues, nous vous invitons à créer un compte entreprise via ce lien : https://memploi.com/jobs/add-ent.
Le/La candidat(e) ${user.firstName} ${user.lastName} est en copie de cet email pour référence et se tient à votre disposition pour toute information complémentaire.
Cordialement,
L’équipe MEMPLOI.COM 
P.S. Pour les candidats qui n'ont pas encore de compte sur MEMPLOI.COM, voici le lien pour rejoindre notre communauté de milliers de professionnels : https://memploi.com/profile/cv.`;
};
