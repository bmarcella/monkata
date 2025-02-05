import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChartsModule } from "ng2-charts";
import { NgxPageScrollModule } from "ngx-page-scroll";
import { NgxPrintModule } from 'ngx-print';
import { ErrorInterceptor } from './_helper/ErrorInterceptor';
import { JwtInterceptor } from './_helper/JWTInterceptor';
import { LoaderInterceptorService } from './_Services/loader-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarHeaderComponent } from './calendar-header.component';
import { AcadComponent } from './commons/acad/acad.component';
import { AddDocComponent } from './commons/add-doc/add-doc.component';
import { AddParentComponent } from './commons/add-parent/add-parent.component';
import { AddPersonelComponent } from './commons/add-personel/add-personel.component';
import { AddProfComponent } from './commons/add-prof/add-prof.component';
import { AddStudentToPromoComponent } from './commons/add-student-to-promo/add-student-to-promo.component';
import { AddStudentComponent } from './commons/add-student/add-student.component';
import { AdmisFicheComponent } from './commons/admis-fiche/admis-fiche.component';
import { AERepriseComponent } from './commons/aereprise/aereprise.component';
import { AfRapComponent } from './commons/af-rap/af-rap.component';
import { AffectationComponent } from './commons/affectation/affectation.component';
import { AllPalmaresComponent } from './commons/all-palmares/all-palmares.component';
import { AllStudentComponent } from './commons/all-student/all-student.component';
import { AnneeDetailsComponent } from './commons/annee-details/annee-details.component';
import { ArchivesComponent } from './commons/archives/archives.component';
import { AsopComponent } from './commons/asop/asop.component';
import { BgComponent } from './commons/bg/bg.component';
import { BoardComponent } from './commons/board/board.component';
import { BoursierComponent } from './commons/boursier/boursier.component';
import { BreadcrumbComponent } from './commons/breadcrumb/breadcrumb.component';
import { BulletinEmptyComponent } from './commons/bulletin-empty/bulletin-empty.component';
import { BulletinFragAllComponent } from './commons/bulletin-frag-all/bulletin-frag-all.component';
import { BulletinFragComponent } from './commons/bulletin-frag/bulletin-frag.component';
import { BulletinGenAllComponent } from './commons/bulletin-gen-all/bulletin-gen-all.component';
import { BulletinGenComponent } from './commons/bulletin-gen/bulletin-gen.component';
import { EncaissementComponent } from './commons/caisse/encaissement/encaissement.component';
import { HencaissementComponent } from './commons/caisse/hencaissement/hencaissement.component';
import { ChangeOPassComponent } from './commons/change-opass/change-opass.component';
import { ChangePassComponent } from './commons/change-pass/change-pass.component';
import { ChangePinComponent } from './commons/change-pin/change-pin.component';
import { ClasseDetailsComponent } from './commons/classe-details/classe-details.component';
import { ClasseComponent } from './commons/classe/classe.component';
import { ConfigCoursComponent } from './commons/config-cours/config-cours.component';
import { ConfigPaiementComponent } from './commons/config-paiement/config-paiement.component';
import { ConfigPromoComponent } from './commons/config-promo/config-promo.component';
import { ConfigStudentPaiementComponent } from './commons/config-student-paiement/config-student-paiement.component';
import { ConfigComponent } from './commons/config/config.component';
import { ContactComponent } from './commons/contact/contact.component';
import { CoursDetailsComponent } from './commons/cours-details/cours-details.component';
import { CoursComponent } from './commons/cours/cours.component';
import { CreateDocComponent } from './commons/create-doc/create-doc.component';
import { DecisionFinaleComponent } from './commons/decision-finale/decision-finale.component';
import { DelFragComponent } from './commons/del-frag/del-frag.component';
import { DelPromoComponent } from './commons/del-promo/del-promo.component';
import { DelUserComponent } from './commons/del-user/del-user.component';
import { DelentiteComponent } from './commons/delentite/delentite.component';
import { DetailsCoursComponent } from './commons/details-cours/details-cours.component';
import { DetailsProfComponent } from './commons/details-prof/details-prof.component';
import { DetailsStudentComponent } from './commons/details-student/details-student.component';
import { DivisionComponent } from './commons/division/division.component';
import { DomaineComponent } from './commons/domaine/domaine.component';
import { EditProfComponent } from './commons/edit-prof/edit-prof.component';
import { EditoProfComponent } from './commons/edito-prof/edito-prof.component';
import { EnteteComponent } from './commons/entete/entete.component';
import { EtatCompteComponent } from './commons/etat-compte/etat-compte.component';
import { EtatDeCompteComponent } from './commons/etat-de-compte/etat-de-compte.component';
import { EtudiantsComponent } from './commons/etudiants/etudiants.component';
import { EventsComponent } from './commons/events/events.component';
import { ExcludeComponent } from './commons/exclude/exclude.component';
import { FicheFournitureComponent } from './commons/fiche-fourniture/fiche-fourniture.component';
import { FichePaymentComponent } from './commons/fiche-payment/fiche-payment.component';
import { FichePersComponent } from './commons/fiche-pers/fiche-pers.component';
import { FicheComponent } from './commons/fiche/fiche.component';
import { FinissantComponent } from './commons/finissant/finissant.component';
import { FooterComponent } from './commons/footer/footer.component';
import { FounitureComponent } from './commons/founiture/founiture.component';
import { FpalmaresComponent } from './commons/fpalmares/fpalmares.component';
import { FpassComponent } from './commons/fpass/fpass.component';
import { GFinissantComponent } from './commons/gfinissant/gfinissant.component';
import { GRPComponent } from './commons/grp/grp.component';
import { HomeComponent } from './commons/home/home.component';
import { LocationComponent } from './commons/location/location.component';
import { LoginComponent } from './commons/login/login.component';
import { LogoutComponent } from './commons/logout/logout.component';
import { MatiereComponent } from './commons/matiere/matiere.component';
import { MnotsComponent } from './commons/mnots/mnots.component';
import { MyPayComponent } from './commons/my-pay/my-pay.component';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { NewPayComponent } from './commons/new-pay/new-pay.component';
import { NoteFactoryComponent } from './commons/note-factory/note-factory.component';
import { NotesComponent } from './commons/notes/notes.component';
import { MainComponent } from './commons/pages/main/main.component';
import { PaieAdmisComponent } from './commons/paie-admis/paie-admis.component';
import { PalmaresComponent } from './commons/palmares/palmares.component';
import { PalmaresvComponent } from './commons/palmaresv/palmaresv.component';
import { ParcoursComponent } from './commons/parcours/parcours.component';
import { ParentComponent } from './commons/parent/parent.component';
import { PayOverComponent } from './commons/pay-over/pay-over.component';
import { PaymentComponent } from './commons/payment/payment.component';
import { PayrollConfigComponent } from './commons/payroll-config/payroll-config.component';
import { PayrollCreateComponent } from './commons/payroll-create/payroll-create.component';
import { PayrollFicheComponent } from './commons/payroll-fiche/payroll-fiche.component';
import { PayrollHistoryComponent } from './commons/payroll-history/payroll-history.component';
import { PayrollStatComponent } from './commons/payroll-stat/payroll-stat.component';
import { PayrollComponent } from './commons/payroll/payroll.component';
import { PersonelComponent } from './commons/personel/personel.component';
import { PresultsComponent } from './commons/presults/presults.component';
import { ProfCoursComponent } from './commons/prof-cours/prof-cours.component';
import { ProfComponent } from './commons/prof/prof.component';
import { ProfilComponent } from './commons/profil/profil.component';
import { ProgDetailsComponent } from './commons/prog-details/prog-details.component';
import { ProgrammeComponent } from './commons/programme/programme.component';
import { PromoDetailsComponent } from './commons/promo-details/promo-details.component';
import { PromoStudentComponent } from './commons/promo-student/promo-student.component';
import { RegisterComponent } from './commons/register/register.component';
import { ReleveNoteGComponent } from './commons/releve-note-g/releve-note-g.component';
import { ReleveNoteComponent } from './commons/releve-note/releve-note.component';
import { ReleveComponent } from './commons/releve/releve.component';
import { RepriseManagerComponent } from './commons/reprise-manager/reprise-manager.component';
import { ResultsComponent } from './commons/results/results.component';
import { ReussiteComponent } from './commons/reussite/reussite.component';
import { RpaiementComponent } from './commons/rpaiement/rpaiement.component';
import { SallesComponent } from './commons/salles/salles.component';
import { SearchComponent } from './commons/search/search.component';
import { SexeStatComponent } from './commons/sexe-stat/sexe-stat.component';
import { SitewebComponent } from './commons/siteweb/siteweb.component';
import { SmatComponent } from './commons/smat/smat.component';
import { StatistiqueComponent } from './commons/statistique/statistique.component';
import { UpgradeComponent } from './commons/upgrade/upgrade.component';
import { VacComponent } from './commons/vac/vac.component';
import { ValiderNomComponent } from './commons/valider-nom/valider-nom.component';
import { SetEtabComponent } from './commponents/set-etab/set-etab.component';
import { SideComponent } from './components/side/side.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EtabPageComponent } from './etab-page/etab-page.component';
import { InternetComponent } from './internet/internet.component';
import { LoaderComponent } from './loader/loader.component';
import { ModalClasseComponent } from './modal-classe/modal-classe.component';
import { ModalAddStudentComponent } from './modals/modal-add-student/modal-add-student.component';
import { NewNotComponent } from './new-not/new-not.component';
import { NotsComponent } from './nots/nots.component';
import { EditSalaryComponent } from './pages/edit-salary/edit-salary.component';
import { PetudiantsComponent } from './pages/petudiants/petudiants.component';
import { PaiePageComponent } from './paie-page/paie-page.component';
import { PayAdmisComponent } from './pay-admis/pay-admis.component';
import { FormaterPipe } from './pipes/formater.pipe';
import { PromoComponent } from './promo/promo.component';
import { PupgradeComponent } from './pupgrade/pupgrade.component';
import { SbulletinComponent } from './sbulletin/sbulletin.component';
import { HeaderPipe } from './student/header.pipe';
// import { IndexComponent } from './tools/index/index.component';
// import { ToolsLeftComponent } from './tools/tools-left/tools-left.component';
// import { ToolsRightComponent } from './tools/tools-right/tools-right.component';
// import { PageWsComponent } from './tools/page-ws/page-ws.component';
// import { AlertComponent } from './tools/alert/alert.component';
// import { ResultsWsComponent } from './tools/results-ws/results-ws.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { LoadingComponent } from './tools/loading/loading.component';
// import { BulletinComponent } from './tools/bulletin/bulletin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CoursStatsGlobalComponent } from './commons/cours-stats-global/cours-stats-global.component';
import { CoursStatsComponent } from './commons/cours-stats/cours-stats.component';
import { MoyStatsGlobalComponent } from './commons/moy-stats-global/moy-stats-global.component';
import { ProfDetailsComponent } from './commons/prog-details/ProfDetails.component';
import { PromoMakerBulletinPageComponent } from './commons/promo-maker-bulletin-page/promo-maker-bulletin-page.component';
import { RedirectComponent } from './commons/redirect/redirect.component';
// julesstacybianca@pledika.com
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    FpassComponent,
    HomeComponent,
    SideComponent,
    SearchComponent,
    NavbarComponent,
    BreadcrumbComponent,
    DetailsStudentComponent,
    ModalAddStudentComponent,
    LogoutComponent,
    DomaineComponent,
    SallesComponent,
    PaieAdmisComponent,
    ProfComponent,
    VacComponent,
    ConfirmationDialogComponent,
    EtabPageComponent,
    PaiePageComponent,
    EtudiantsComponent,
    FicheComponent,
    PayAdmisComponent,
    ModalClasseComponent,
    AcadComponent,
    PromoDetailsComponent,
    AddDocComponent,
    AddProfComponent,
    DetailsProfComponent,
    MatiereComponent,
    AddStudentToPromoComponent,
    CoursComponent,
    PromoComponent,
    AddStudentComponent,
    ResultsComponent,
    PromoStudentComponent,
    BulletinFragComponent,
    BulletinGenComponent,
    BulletinGenAllComponent,
    BulletinFragAllComponent,
    ProgrammeComponent,
    ProgDetailsComponent,
    AsopComponent,
    PaymentComponent,
    ParcoursComponent,
    FichePaymentComponent,
    ProfilComponent,
    PersonelComponent,
    AddPersonelComponent,
    MyPayComponent,
    ConfigComponent,
    ClasseComponent,
    BgComponent,
    ClasseDetailsComponent,
    ProfCoursComponent,
    CoursDetailsComponent,
    PresultsComponent,
    EditProfComponent,
    ChangePassComponent,
    ChangeOPassComponent,
    FichePersComponent,
    PayrollComponent,
    NewPayComponent,
    PayrollConfigComponent,
    PayrollHistoryComponent,
    PayrollCreateComponent,
    EditSalaryComponent,
    PayOverComponent,
    PayrollFicheComponent,
    PayrollStatComponent,
    EditoProfComponent,
    AdmisFicheComponent,
    CreateDocComponent,
    BoardComponent,
    LoaderComponent,
    InternetComponent,
    NotsComponent,
    NewNotComponent,
    NotesComponent,
    DelPromoComponent,
    DelFragComponent,
    UpgradeComponent,
    RpaiementComponent,
    EtatCompteComponent,
    ConfigPaiementComponent,
    ConfigStudentPaiementComponent,
    SitewebComponent,
    SmatComponent,
    DetailsCoursComponent,
    FormaterPipe,
    AffectationComponent,
    ConfigPromoComponent,
    LocationComponent,
    AllStudentComponent,
    StatistiqueComponent,
    NoteFactoryComponent,
    SexeStatComponent,
    EnteteComponent,
    ArchivesComponent,
    PalmaresComponent,
    PupgradeComponent,
    BulletinEmptyComponent,
    AnneeDetailsComponent,
    ConfigCoursComponent,
    AfRapComponent,
    EtatDeCompteComponent,
    FounitureComponent,
    FicheFournitureComponent,
    ChangePinComponent,
    EncaissementComponent,
    HencaissementComponent,
    FpalmaresComponent,
    PalmaresvComponent,
    AllPalmaresComponent,
    ReleveComponent,
    ContactComponent,
    MnotsComponent,
    CalendarHeaderComponent,
    EventsComponent,
    ReleveNoteComponent,
    ReleveNoteGComponent,
    ExcludeComponent,
    BoursierComponent,
    DivisionComponent,
    FinissantComponent,
    GFinissantComponent,
    GRPComponent,
    AERepriseComponent,
    DecisionFinaleComponent,
    RepriseManagerComponent,
    HeaderPipe,
    SbulletinComponent,
    ParentComponent,
    DelentiteComponent,
    AddParentComponent,
    DelUserComponent,
    ValiderNomComponent,
    ReussiteComponent,
    PetudiantsComponent,
    SetEtabComponent,
    PromoMakerBulletinPageComponent,
    CoursStatsComponent,
    RedirectComponent,
    CoursStatsGlobalComponent,
    MoyStatsGlobalComponent,
    ProfDetailsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    ChartsModule,
    NgxPageScrollModule,
    AngularEditorModule,
    CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    //  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
