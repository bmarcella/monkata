// import { IndexComponent } from './tools/index/index.component';
import { ReleveNoteComponent } from './commons/releve-note/releve-note.component';
import { ChangePassComponent } from './commons/change-pass/change-pass.component';
import { MyPayComponent } from './commons/my-pay/my-pay.component';
import { EditProfComponent } from './commons/edit-prof/edit-prof.component';
import { ProgrammeComponent } from './commons/programme/programme.component';
import { BulletinFragComponent } from './commons/bulletin-frag/bulletin-frag.component';
import { FicheComponent } from './commons/fiche/fiche.component';
import { EtudiantsComponent } from './commons/etudiants/etudiants.component';
import { PaiePageComponent } from './paie-page/paie-page.component';
import { EtabPageComponent } from './etab-page/etab-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commons/login/login.component';
import { RegisterComponent } from './commons/register/register.component';
import { FpassComponent } from './commons/fpass/fpass.component';
import { HomeComponent } from './commons/home/home.component';
import { AuthGuard } from './_helper/AuthGuard';
import { PaieAdmisComponent } from './commons/paie-admis/paie-admis.component';
import { ProfComponent } from './commons/prof/prof.component';
import { SallesComponent } from './commons/salles/salles.component';
import { VacComponent } from './commons/vac/vac.component';
import { AcadComponent } from './commons/acad/acad.component';
import { PromoDetailsComponent } from './commons/promo-details/promo-details.component';
import { AddProfComponent } from './commons/add-prof/add-prof.component';
import { DetailsProfComponent } from './commons/details-prof/details-prof.component';
import { MatiereComponent } from './commons/matiere/matiere.component';
import { CoursComponent } from './commons/cours/cours.component';
import { PromoComponent } from './promo/promo.component';
import { AddStudentToPromoComponent } from './commons/add-student-to-promo/add-student-to-promo.component';
import { AddStudentComponent } from './commons/add-student/add-student.component';
import { ResultsComponent } from './commons/results/results.component';
import { PromoStudentComponent } from './commons/promo-student/promo-student.component';
import { ProgDetailsComponent } from './commons/prog-details/prog-details.component';
import { AsopComponent } from './commons/asop/asop.component';
import { PaymentComponent } from './commons/payment/payment.component';
import { ParcoursComponent } from './commons/parcours/parcours.component';
import { FichePaymentComponent } from './commons/fiche-payment/fiche-payment.component';
import { ProfilComponent } from './commons/profil/profil.component';
import { PersonelComponent } from './commons/personel/personel.component';
import { AddPersonelComponent } from './commons/add-personel/add-personel.component';
import { ClasseComponent } from './commons/classe/classe.component';
import { ConfigComponent } from './commons/config/config.component';
import { ProfCoursComponent } from './commons/prof-cours/prof-cours.component';
import { PresultsComponent } from './commons/presults/presults.component';
import { ChangeOPassComponent } from './commons/change-opass/change-opass.component';
import { FichePersComponent } from './commons/fiche-pers/fiche-pers.component';
import { PayrollConfigComponent } from './commons/payroll-config/payroll-config.component';
import { PayrollHistoryComponent } from './commons/payroll-history/payroll-history.component';
import { PayrollCreateComponent } from './commons/payroll-create/payroll-create.component';
import { PayrollComponent } from './commons/payroll/payroll.component';
import { PayOverComponent } from './commons/pay-over/pay-over.component';
import { PayrollFicheComponent } from './commons/payroll-fiche/payroll-fiche.component';
import { PayrollStatComponent } from './commons/payroll-stat/payroll-stat.component';
import { AdmisFicheComponent } from './commons/admis-fiche/admis-fiche.component';
import { CreateDocComponent } from './commons/create-doc/create-doc.component';
import { DetailsStudentComponent } from './commons/details-student/details-student.component';
import { DetailsCoursComponent } from './commons/details-cours/details-cours.component';
import { EditoProfComponent } from './commons/edito-prof/edito-prof.component';
import { BoardComponent } from './commons/board/board.component';
import { BulletinGenComponent } from './commons/bulletin-gen/bulletin-gen.component';
import { NewNotComponent } from './new-not/new-not.component';
import { DelPromoComponent } from './commons/del-promo/del-promo.component';
import { UpgradeComponent } from './commons/upgrade/upgrade.component';
import { RpaiementComponent } from './commons/rpaiement/rpaiement.component';
import { ConfigPaiementComponent } from './commons/config-paiement/config-paiement.component';
import { ConfigStudentPaiementComponent } from './commons/config-student-paiement/config-student-paiement.component';
import { SitewebComponent } from './commons/siteweb/siteweb.component';
import { AffectationComponent } from './commons/affectation/affectation.component';
import { LocationComponent } from './commons/location/location.component';
import { ConfigPromoComponent } from './commons/config-promo/config-promo.component';
import { NotesComponent } from './commons/notes/notes.component';
import { StatistiqueComponent } from './commons/statistique/statistique.component';
import { AllStudentComponent } from './commons/all-student/all-student.component';
import { NoteFactoryComponent } from './commons/note-factory/note-factory.component';
import { SexeStatComponent } from './commons/sexe-stat/sexe-stat.component';
import { DomaineComponent } from './commons/domaine/domaine.component';
import { ArchivesComponent } from './commons/archives/archives.component';
import { PalmaresComponent } from './commons/palmares/palmares.component';
import { PupgradeComponent } from './pupgrade/pupgrade.component';
import { BulletinFragAllComponent } from './commons/bulletin-frag-all/bulletin-frag-all.component';
import { BulletinEmptyComponent } from './commons/bulletin-empty/bulletin-empty.component';
import { AnneeDetailsComponent } from './commons/annee-details/annee-details.component';
import { CoursDetailsComponent } from './commons/cours-details/cours-details.component';
import { ConfigCoursComponent } from './commons/config-cours/config-cours.component';
import { AfRapComponent } from './commons/af-rap/af-rap.component';
import { EtatDeCompteComponent } from './commons/etat-de-compte/etat-de-compte.component';
import { BulletinGenAllComponent } from './commons/bulletin-gen-all/bulletin-gen-all.component';
import { FounitureComponent } from './commons/founiture/founiture.component';
import { FicheFournitureComponent } from './commons/fiche-fourniture/fiche-fourniture.component';
import { EncaissementComponent } from './commons/caisse/encaissement/encaissement.component';
import { HencaissementComponent } from './commons/caisse/hencaissement/hencaissement.component';
import { FpalmaresComponent } from './commons/fpalmares/fpalmares.component';
import { ContactComponent } from './commons/contact/contact.component';
import { MnotsComponent } from './commons/mnots/mnots.component';
import { EventsComponent } from './commons/events/events.component';
import { ReleveNoteGComponent } from './commons/releve-note-g/releve-note-g.component';
import { ReleveComponent } from './commons/releve/releve.component';
import { ExcludeComponent } from './commons/exclude/exclude.component';
import { BoursierComponent } from './commons/boursier/boursier.component';
import { DivisionComponent } from './commons/division/division.component';
import { FinissantComponent } from './commons/finissant/finissant.component';
import { GFinissantComponent } from './commons/gfinissant/gfinissant.component';
import { AERepriseComponent } from './commons/aereprise/aereprise.component';
import { GRPComponent } from './commons/grp/grp.component';
import { DecisionFinaleComponent } from './commons/decision-finale/decision-finale.component';
import { RepriseManagerComponent } from './commons/reprise-manager/reprise-manager.component';
import { SbulletinComponent } from './sbulletin/sbulletin.component';
import { StudGuard } from './_helper/StudGuard';
import { AllGuard } from './_helper/AllGuard';
import { ParentComponent } from './commons/parent/parent.component';
import { AddParentComponent } from './commons/add-parent/add-parent.component';
import { DelUserComponent } from './commons/del-user/del-user.component';
import { PromoMakerBulletinPageComponent } from './commons/promo-maker-bulletin-page/promo-maker-bulletin-page.component';
import { PetudiantsComponent } from './pages/petudiants/petudiants.component';
import { ParentGuard } from './_helper/ParentGuard';
import { SetEtabComponent } from './commponents/set-etab/set-etab.component';
import { CoursStatsComponent } from './commons/cours-stats/cours-stats.component';
import { RedirectComponent } from './commons/redirect/redirect.component';
import { CoursStatsGlobalComponent } from './commons/cours-stats-global/cours-stats-global.component';
import { MoyStatsGlobalComponent } from './commons/moy-stats-global/moy-stats-global.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/setEtab',
    pathMatch: 'full',
  },
  {
    path: 'app/siteweb',
    component: SitewebComponent,
  },
  {
    path: 'app/setEtab/:etab',
    component: SetEtabComponent,
  },
  {
    path: 'app/setEtab',
    component: SetEtabComponent,
  },
  {
    path: 'app/login',
    component: LoginComponent,
  },
  {
    path: 'app/register',
    component: RegisterComponent,
  },
  {
    path: 'app/fpass',
    component: FpassComponent,
  },
  {
    path: 'app/home',
    component: HomeComponent,
    canActivate: [AllGuard],
  },
  {
    path: 'app/profil',
    component: ProfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/ficheFourniture',
    component: FicheFournitureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/personnel',
    component: PersonelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/configCours',
    component: ConfigCoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/detailsCours/:id',
    component: CoursDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/delPromo/:id',
    component: DelPromoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/upgrade/:id',
    component: UpgradeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/addPersonnel',
    component: AddPersonelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/domaine',
    component: DomaineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/afrap',
    component: AfRapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/detailsEtudiant/:id',
    component: DetailsStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/detailsProf/:id',
    component: DetailsProfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/etudiants',
    component: EtudiantsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/affectation',
    component: AffectationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/progression',
    component: PupgradeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/palmares/:id/:idp',
    component: PalmaresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/location',
    component: LocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/etatDeCompte',
    component: EtatDeCompteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/rapportPaiement',
    component: RpaiementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll/config',
    component: PayrollConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll/stat',
    component: PayrollStatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/configPromo',
    component: ConfigPromoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll/finish',
    component: PayOverComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/caisse/transaction',
    component: EncaissementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/caisse/htransaction',
    component: HencaissementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll/payrollFiche/:id',
    component: PayrollFicheComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll/history',
    component: PayrollHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll/create',
    component: PayrollCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/configPaiementStudent/:id/:idp',
    component: ConfigStudentPaiementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/configPaiement',
    component: ConfigPaiementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/paieAdmis',
    component: PaieAdmisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/profs',
    component: ProfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/vacation',
    component: VacComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/salle',
    component: SallesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/management',
    component: EtabPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/paiement',
    component: PaiePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payroll',
    component: PaiePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/mesPaiements',
    component: MyPayComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/fiche/:id',
    component: FicheComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/fichePers/:id',
    component: FichePersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/fichePay/:id/:idp',
    component: FichePaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/acad',
    component: AcadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/prof',
    component: ProfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/payment/:id',
    component: PaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/profCours/:id',
    component: ProfCoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/parcours',
    component: ParcoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/addProf',
    component: AddProfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/addEtudiant',
    component: AddStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/promoDetails/:id',
    component: PromoDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/results/:idp/:idf/:idcf',
    component: ResultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/prof_results/:idp/:idf/:idcf',
    component: PresultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/matiere',
    component: MatiereComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/cours',
    component: CoursComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/cpass',
    component: ChangePassComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/cpass/:id',
    component: ChangeOPassComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/config',
    component: ConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/programme',
    component: ProgrammeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/programme/:page',
    component: ProgrammeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/classe',
    component: ClasseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/classe/:page',
    component: ClasseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/editProf',
    component: EditProfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/editProf/:id',
    component: EditoProfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/fpalmares/:id/:idp',
    component: FpalmaresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/asop/:id',
    component: AsopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/admisFiche/:code',
    component: AdmisFicheComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/progDetails/:id',
    component: ProgDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/createdDoc/:id/:n',
    component: CreateDocComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/addStudentToPromo/:id',
    component: AddStudentToPromoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/promoStudent/:id/:idf',
    component: PromoStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/board/:id',
    component: BoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/bulletinFrag/:idu/:idf',
    component: BulletinFragComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/bulletinFrag/:idu/:idf/:idp',
    component: BulletinFragComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/bulletinFragAll/:idf/:idp',
    component: BulletinFragAllComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/vbulletinFragAll/:idf/:idp',
    component: BulletinEmptyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/bulletinGen/:idp/:idu',
    component: BulletinGenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/bulletinGenAll/:id',
    component: BulletinGenAllComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/statCours/:id/:idp',
    component: CoursStatsComponent,
    canActivate: [AuthGuard],
  },
   {
    path: 'app/statMoys/:id',
    component: MoyStatsGlobalComponent,
    canActivate: [AuthGuard],
  },
   {
    path: 'app/statCoursGlobal/:id',
    component: CoursStatsGlobalComponent,
    canActivate: [AuthGuard],
  },

   {
    path: 'app/redirect/:url',
    component: RedirectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/anneeDetails/:id',
    component: AnneeDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/not/:id',
    component: NewNotComponent,
    canActivate: [AllGuard],
  },
  {
    path: 'app/notes',
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/statistique',
    component: StatistiqueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/allStudent',
    component: AllStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/fourniture',
    component: FounitureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/noteFactory',
    component: NoteFactoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/sexeStat',
    component: SexeStatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/archives',
    component: ArchivesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/noteFactory',
    component: NoteFactoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/contact',
    component: ContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/noteForMat/:id/:idp',
    component: MnotsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/rnotep',
    component: ReleveNoteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/rnoteg',
    component: ReleveNoteGComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/lpalmares',
    component: ReleveComponent,
    canActivate: [AuthGuard],
  },
{
    path: 'app/events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/anneeDivision',
    component: DivisionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/poubelle',
    component: ExcludeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/boursier',
    component: BoursierComponent,
    canActivate: [AuthGuard],
  },
{
    path: 'app/boursier',
    component: BoursierComponent,
    canActivate: [AuthGuard],
  },
 {
    path: 'app/finissant',
    component: FinissantComponent,
    canActivate: [AuthGuard],
  },
 {
    path: 'app/gfinissant',
    component: GFinissantComponent,
    canActivate: [AuthGuard],
  },
 {
    path: 'app/AEReprise/:id/:idf',
    component: AERepriseComponent,
    canActivate: [AuthGuard],
  },
 {
    path: 'app/GRP',
    component: GRPComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/decisionFinale',
    component: DecisionFinaleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/periodeManager',
    component: RepriseManagerComponent,
    canActivate: [AuthGuard],
  },
 {
    path: 'app/parents',
    component: ParentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/addParent',
    component: AddParentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/delete',
    component: DelUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/goTo/:link/:key',
    component: PromoMakerBulletinPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/bulletinEtudiants/:idp/:idu',
    component: SbulletinComponent,
    canActivate: [StudGuard],
  },
  {
    path: 'app/pEtudiants/:id',
    component: PetudiantsComponent,
    canActivate: [ParentGuard],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
