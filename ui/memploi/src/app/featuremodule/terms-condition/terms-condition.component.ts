import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent {
  public routes=routes;

  terms: any =  {
    "titre": "Conditions Générales d'Utilisation de Monkata Services",
    "bienvenue": "Bienvenue sur MEMPLOI.COM !",
    "description": "Ces Conditions Générales d'Utilisation (\"Conditions\") régissent votre utilisation de la plateforme Monkata Services, accessible via le site web memploi.com (\"Plateforme\"). En accédant ou en utilisant notre Plateforme, vous acceptez d'être lié par ces Conditions et notre Politique de Confidentialité. Veuillez lire attentivement ces Conditions avant d'accéder ou d'utiliser la Plateforme. Si vous n'acceptez pas ces Conditions, vous ne pouvez pas utiliser la Plateforme.",
    "sections": [
      {
        "titre": "Utilisation de la Plateforme",
        "sous_sections": [
          {
            "sous_titre": "Éligibilité",
            "contenu": "Vous devez avoir au moins 18 ans et avoir la capacité légale de conclure ces Conditions pour utiliser la Plateforme. En utilisant la Plateforme, vous déclarez et garantissez que vous répondez à ces exigences d'éligibilité."
          },
          {
            "sous_titre": "Inscription au Compte",
            "contenu": "Pour accéder à certaines fonctionnalités de la Plateforme, vous pouvez être amené à vous inscrire à un compte. Vous acceptez de fournir des informations exactes, actuelles et complètes lors du processus d'inscription et de mettre à jour ces informations pour les maintenir exactes, actuelles et complètes."
          },
          {
            "sous_titre": "Contenu Utilisateur",
            "contenu": "Vous êtes seul responsable de tout contenu que vous soumettez, publiez ou affichez sur la Plateforme (\"Contenu Utilisateur\"). Vous conservez la propriété de votre Contenu Utilisateur, mais en le soumettant, en le publiant ou en l'affichant, vous accordez à Monkata Services une licence mondiale, gratuite, non exclusive pour utiliser, reproduire, modifier, adapter, publier, traduire, distribuer et afficher ce Contenu Utilisateur en relation avec la Plateforme."
          }
        ]
      },
      {
        "titre": "Offres d'Emploi et Candidatures",
        "sous_sections": [
          {
            "sous_titre": "Offres d'Emploi",
            "contenu": "Monkata Services peut permettre aux entreprises de publier des offres d'emploi sur la Plateforme. Nous ne garantissons pas l'exactitude, l'exhaustivité ou la fiabilité des offres d'emploi. Les candidats doivent vérifier indépendamment les informations fournies dans les offres d'emploi avant de postuler."
          },
          {
            "sous_titre": "Candidatures",
            "contenu": "Les candidats peuvent postuler aux offres d'emploi via la Plateforme. Monkata Services ne garantit pas que postuler à une offre d'emploi entraînera un emploi. Nous ne sommes pas responsables des interactions entre les candidats et les entreprises, et nous déclinons toute responsabilité découlant de telles interactions."
          }
        ]
      },
      {
        "titre": "Comportement Interdit",
        "sous_sections": [
          {
            "sous_titre": "Conditions",
            "contenu": [
              "Violation de toute loi ou réglementation applicable",
              "Usurpation de l'identité d'une personne ou d'une entité, ou déclaration fausse ou autrement trompeuse de votre affiliation à une personne ou une entité",
              "Interférence avec ou perturbation du fonctionnement de la Plateforme ou des serveurs ou réseaux utilisés pour rendre la Plateforme disponible",
              "Collecte d'adresses e-mail ou d'autres informations de contact d'autres utilisateurs de la Plateforme par des moyens électroniques ou autres",
              "Utilisation de la Plateforme à des fins illégales, frauduleuses ou autrement nuisibles"
            ]
          }
        ]
      },
      {
        "titre": "Propriété Intellectuelle",
        "contenu": "La Plateforme et son contenu, y compris mais sans s'y limiter le texte, les graphiques, les logos, les images et les logiciels, sont protégés par le droit d'auteur, les marques de commerce et autres lois sur la propriété intellectuelle. Vous acceptez de ne pas modifier, reproduire, distribuer ou créer des œuvres dérivées basées sur la Plateforme ou son contenu sans notre consentement écrit préalable."
      },
      {
        "titre": "Clause de Non-Responsabilité",
        "contenu": "La Plateforme est fournie \"telle quelle\" et \"selon sa disponibilité\", sans aucune garantie d'aucune sorte, expresse ou implicite. Monkata Services décline toutes les garanties, y compris mais sans s'y limiter les garanties implicites de qualité marchande, d'adéquation à un usage particulier et de non-contrefaçon."
      },
      {
        "titre": "Limitation de Responsabilité",
        "contenu": "Monkata Services ne sera pas responsable de tout dommage indirect, accessoire, spécial, consécutif ou punitif, ou de toute perte de profits ou de revenus, qu'ils soient encourus directement ou indirectement, ou de toute perte de données, d'utilisation, de bonne volonté ou d'autres pertes immatérielles, résultant de votre accès ou de votre utilisation de la Plateforme."
      },
      {
        "titre": "Loi Applicable et Règlement des Litiges",
        "contenu":
          "Ces Conditions seront régies et interprétées conformément aux lois Haïtiens, sans égard à ses principes de conflits de lois. Tout litige découlant de ou lié à ces Conditions ou à votre utilisation de la Plateforme sera résolu exclusivement et conformément à ses Règles d'Arbitrage Commercial."

      },
      {
        "titre": "Modifications des Conditions",
        "contenu": "Monkata Services se réserve le droit de modifier ou de mettre à jour ces Conditions à tout moment. Nous vous informerons de tout changement en publiant les nouvelles Conditions sur la Plateforme. Votre utilisation continue de la Plateforme après de tels changements constitue votre acceptation des nouvelles Conditions."
      },
      {
        "titre": "Nous Contacter",
        "contenu": "Si vous avez des questions concernant ces Conditions, veuillez nous contacter à partir de la page de contact."
      }
    ]
  }

}
