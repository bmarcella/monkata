import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './commons/footer/footer.component';
import { MainComponent } from './commons/pages/main/main.component';
import { LoginComponent } from './commons/login/login.component';
import { RegisterComponent } from './commons/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './_helper/JWTInterceptor';
import { ErrorInterceptor } from './_helper/ErrorInterceptor';
import { FpassComponent } from './commons/fpass/fpass.component';
import { HomeComponent } from './commons/home/home.component';
import { SideComponent } from './components/side/side.component';
import { SearchComponent } from './commons/search/search.component';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { BreadcrumbComponent } from './commons/breadcrumb/breadcrumb.component';
import { DetailsStudentComponent } from './commons/details-student/details-student.component';
import { ModalAddStudentComponent } from './modals/modal-add-student/modal-add-student.component';
import { LogoutComponent } from './commons/logout/logout.component';
import { SallesComponent } from './commons/salles/salles.component';
import { PaieAdmisComponent } from './commons/paie-admis/paie-admis.component';
import { ProfComponent } from './commons/prof/prof.component';
import { VacComponent } from './commons/vac/vac.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EtabPageComponent } from './etab-page/etab-page.component';
import { PaiePageComponent } from './paie-page/paie-page.component';
import { EtudiantsComponent } from './commons/etudiants/etudiants.component';
import { FicheComponent } from './commons/fiche/fiche.component';
import { PayAdmisComponent } from './pay-admis/pay-admis.component';
import { NgxPrintModule } from 'ngx-print';
import { ModalClasseComponent } from './modal-classe/modal-classe.component';
import { AcadComponent } from './commons/acad/acad.component';
import { PromoDetailsComponent } from './commons/promo-details/promo-details.component';
import { AddDocComponent } from './commons/add-doc/add-doc.component';
import { AddProfComponent } from './commons/add-prof/add-prof.component';
import { DetailsProfComponent } from './commons/details-prof/details-prof.component';
import { MatiereComponent } from './commons/matiere/matiere.component';
import { AddStudentToPromoComponent } from './commons/add-student-to-promo/add-student-to-promo.component';
import { CoursComponent } from './commons/cours/cours.component';
import { PromoComponent } from './promo/promo.component';
import { AddStudentComponent } from './commons/add-student/add-student.component';
import { ResultsComponent } from './commons/results/results.component';
import { PromoStudentComponent } from './commons/promo-student/promo-student.component';
import { BulletinFragComponent } from './commons/bulletin-frag/bulletin-frag.component';
import { BulletinGenComponent } from './commons/bulletin-gen/bulletin-gen.component';
import { BulletinGenAllComponent } from './commons/bulletin-gen-all/bulletin-gen-all.component';
import { BulletinFragAllComponent } from './commons/bulletin-frag-all/bulletin-frag-all.component';
import { ProgrammeComponent } from './commons/programme/programme.component';
import { ProgDetailsComponent } from './commons/prog-details/prog-details.component';
import { AsopComponent } from './commons/asop/asop.component';
import { PaymentComponent } from './commons/payment/payment.component';
import { ParcoursComponent } from './commons/parcours/parcours.component';
import { FichePaymentComponent } from './commons/fiche-payment/fiche-payment.component';
import { ProfilComponent } from './commons/profil/profil.component';
import { PersonelComponent } from './commons/personel/personel.component';
import { AddPersonelComponent } from './commons/add-personel/add-personel.component';
import { MyPayComponent } from './commons/my-pay/my-pay.component';
import { ConfigComponent } from './commons/config/config.component';
import { ClasseComponent } from './commons/classe/classe.component';
import { BgComponent } from './commons/bg/bg.component';
import { ClasseDetailsComponent } from './commons/classe-details/classe-details.component';
import { ProfCoursComponent } from './commons/prof-cours/prof-cours.component';
import { CoursDetailsComponent } from './commons/cours-details/cours-details.component';
import { PresultsComponent } from './commons/presults/presults.component';
import { EditProfComponent } from './commons/edit-prof/edit-prof.component';
import { ChangePassComponent } from './commons/change-pass/change-pass.component';
import { ChangeOPassComponent } from './commons/change-opass/change-opass.component';
import { FichePersComponent } from './commons/fiche-pers/fiche-pers.component';
import { PayrollComponent } from './commons/payroll/payroll.component';
import { NewPayComponent } from './commons/new-pay/new-pay.component';
import { PayrollConfigComponent } from './commons/payroll-config/payroll-config.component';
import { PayrollHistoryComponent } from './commons/payroll-history/payroll-history.component';
import { PayrollCreateComponent } from './commons/payroll-create/payroll-create.component';
import { EditSalaryComponent } from './pages/edit-salary/edit-salary.component';
import { PayOverComponent } from './commons/pay-over/pay-over.component';
import { PayrollFicheComponent } from './commons/payroll-fiche/payroll-fiche.component';
import { PayrollStatComponent } from './commons/payroll-stat/payroll-stat.component';
import { EditoProfComponent } from './commons/edito-prof/edito-prof.component';
import { AdmisFicheComponent } from './commons/admis-fiche/admis-fiche.component';
import { CreateDocComponent } from './commons/create-doc/create-doc.component';
import { BoardComponent } from './commons/board/board.component';
import { LoaderComponent } from './loader/loader.component';
import { InternetComponent } from './internet/internet.component';
import { LoaderInterceptorService } from './_Services/loader-interceptor.service';
import { NotsComponent } from './nots/nots.component';
import { NewNotComponent } from './new-not/new-not.component';
import { DelPromoComponent } from './commons/del-promo/del-promo.component';
import { DelFragComponent } from './commons/del-frag/del-frag.component';
import { UpgradeComponent } from './commons/upgrade/upgrade.component';
import { RpaiementComponent } from './commons/rpaiement/rpaiement.component';
import { EtatCompteComponent } from './commons/etat-compte/etat-compte.component';
import { ConfigPaiementComponent } from './commons/config-paiement/config-paiement.component';
import { ConfigStudentPaiementComponent } from './commons/config-student-paiement/config-student-paiement.component';
import { SitewebComponent } from './commons/siteweb/siteweb.component';
import { SmatComponent } from './commons/smat/smat.component';
import { DetailsCoursComponent } from './commons/details-cours/details-cours.component';
import { FormaterPipe } from './pipes/formater.pipe';
import { AffectationComponent } from './commons/affectation/affectation.component';
import { ConfigPromoComponent } from './commons/config-promo/config-promo.component';
import { LocationComponent } from './commons/location/location.component';
import { AllStudentComponent } from './commons/all-student/all-student.component';
import { StatistiqueComponent } from './commons/statistique/statistique.component';
import { NoteFactoryComponent } from './commons/note-factory/note-factory.component';
import { SexeStatComponent } from './commons/sexe-stat/sexe-stat.component';
import { ChartsModule } from "ng2-charts";
import { NotesComponent } from './commons/notes/notes.component';
import { EnteteComponent } from './commons/entete/entete.component';
import { DomaineComponent } from './commons/domaine/domaine.component';
import { ArchivesComponent } from './commons/archives/archives.component';
import { PalmaresComponent } from './commons/palmares/palmares.component';
import { PupgradeComponent } from './pupgrade/pupgrade.component';
import { NgxPageScrollModule } from "ngx-page-scroll";
import { BulletinEmptyComponent } from './commons/bulletin-empty/bulletin-empty.component';
import { AnneeDetailsComponent } from './commons/annee-details/annee-details.component';
import { ConfigCoursComponent } from './commons/config-cours/config-cours.component';
import { AfRapComponent } from './commons/af-rap/af-rap.component';
import { EtatDeCompteComponent } from './commons/etat-de-compte/etat-de-compte.component';
import { FounitureComponent } from './commons/founiture/founiture.component';
import { FicheFournitureComponent } from './commons/fiche-fourniture/fiche-fourniture.component';
import { ChangePinComponent } from './commons/change-pin/change-pin.component';
import { HencaissementComponent } from './commons/caisse/hencaissement/hencaissement.component';
import { EncaissementComponent } from './commons/caisse/encaissement/encaissement.component';
import { FpalmaresComponent } from './commons/fpalmares/fpalmares.component';
import { PalmaresvComponent } from './commons/palmaresv/palmaresv.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AllPalmaresComponent } from './commons/all-palmares/all-palmares.component';
import { ReleveComponent } from './commons/releve/releve.component';
import { ContactComponent } from './commons/contact/contact.component';
import { MnotsComponent } from './commons/mnots/mnots.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CalendarHeaderComponent } from './calendar-header.component';
import { EventsComponent } from './commons/events/events.component';
import { ReleveNoteComponent } from './commons/releve-note/releve-note.component';
import { ReleveNoteGComponent } from './commons/releve-note-g/releve-note-g.component';
import { ExcludeComponent } from './commons/exclude/exclude.component';
import { BoursierComponent } from './commons/boursier/boursier.component';
import { DivisionComponent } from './commons/division/division.component';
import { FinissantComponent } from './commons/finissant/finissant.component';
import { GFinissantComponent } from './commons/gfinissant/gfinissant.component';
import { GRPComponent } from './commons/grp/grp.component';
import { AERepriseComponent } from './commons/aereprise/aereprise.component';
import { DecisionFinaleComponent } from './commons/decision-finale/decision-finale.component';
import { RepriseManagerComponent } from './commons/reprise-manager/reprise-manager.component';
import { HeaderPipe } from './student/header.pipe';
import { SbulletinComponent } from './sbulletin/sbulletin.component';
import { ParentComponent } from './commons/parent/parent.component';
import { DelentiteComponent } from './commons/delentite/delentite.component';
import { AddParentComponent } from './commons/add-parent/add-parent.component';
import { DelUserComponent } from './commons/del-user/del-user.component';
import { ValiderNomComponent } from './commons/valider-nom/valider-nom.component';
import { ReussiteComponent } from './commons/reussite/reussite.component';
import { PetudiantsComponent } from './pages/petudiants/petudiants.component';
import { SetEtabComponent } from './commponents/set-etab/set-etab.component';
// import { IndexComponent } from './tools/index/index.component';
// import { ToolsLeftComponent } from './tools/tools-left/tools-left.component';
// import { ToolsRightComponent } from './tools/tools-right/tools-right.component';
// import { PageWsComponent } from './tools/page-ws/page-ws.component';
// import { AlertComponent } from './tools/alert/alert.component';
// import { ResultsWsComponent } from './tools/results-ws/results-ws.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { LoadingComponent } from './tools/loading/loading.component';
// import { BulletinComponent } from './tools/bulletin/bulletin.component';
import { PromoMakerBulletinPageComponent } from './commons/promo-maker-bulletin-page/promo-maker-bulletin-page.component';
import { CoursStatsComponent } from './commons/cours-stats/cours-stats.component';
import { RedirectComponent } from './commons/redirect/redirect.component';
import { CoursStatsGlobalComponent } from './commons/cours-stats-global/cours-stats-global.component';
import { MoyStatsGlobalComponent } from './commons/moy-stats-global/moy-stats-global.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
    MoyStatsGlobalComponent
  ],


    // CalendarModule.forRoot({
    // provide: DateAdapter,
    // useFactory: adapterFactory
    // })
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
