import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { first } from 'rxjs/operators';
import { colors } from 'src/app/colors';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { CEvent } from './CEvent';


interface Holiday {
  created_at: string;
  name: string;
  categorie:CEvent
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
   constructor(
    public nServ: AppService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {

  }
// get your own key from https://holidayapi.com/
  HOLIDAY_API_KEY ;
  locale = 'fr';

// change this to your own country
   COUNTRY_CODE = 'HT';
   seq: any;
   cats: any;
   response = { state: '', message: '', active: false, view: 0 };
   event = {categorie: [], name: '', day: '', month: '', year: '', details: ''};
   view: CalendarView = CalendarView.Month;
 // viewDate = startOfYear(subYears(new Date(), 1));

  viewDate = new Date();
  events: CalendarEventWithMeta[] = [];

 loading;


  ngOnInit() {
    this.getEventInfo();
    this.getEvents();
  }

getEventInfo() {
    const url = `${environment.apiUrl}getEventInfo`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cats = data.data.cats;
        },
        (error) => {}
      );
  }

addEvent() {
    const url = `${environment.apiUrl}getEventInfo`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cats = data.data.cats;
          this.seq = data.data.seq;
          this.cdr.markForCheck();
        },
        (error) => {this.cdr.markForCheck(); }
      );
  }

addEventJF() {
if (this.loading) {return;
}
this.loading = true;
const url = `${environment.apiUrl}events`;
// tslint:disable-next-line:max-line-length
const DATA = {categorie:CEvent.JOUR_FERIE ,name: this.event.name, details: this.event.details, has_during: false, day: this.event.day, month: this.event.month};
this.nServ.setData(url, DATA)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          this.response.view = 1;
          if (data != null) {
            this.response.state = 'success';
            this.response.message = 'Insertion affectuée avec succes';
            this.event = { categorie: [], name: '', day: '', month: '', year: '', details: ''};
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
          }
        },
        (error) => {
           this.loading = false;
           this.response.active = true;
           this.response.view = 1;
           this.response.state = 'danger';
           this.response.message = error;
          }
      );
  }

delEvent(id) {
if (this.loading) {return;
}
this.loading = true;
const url = `${environment.apiUrl}events/${id}`;
// tslint:disable-next-line:max-line-length
this.nServ.delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          this.response.view = 10;
          if (data != null) {
            this.response.message = 'Insertion affectuée avec succès';
            this.response.state = 'success';
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
          }
        },
        (error) => {
           this.loading = false;
           this.response.active = true;
           this.response.view = 10;
           this.response.state = 'danger';
           this.response.message = error;
          }
      );
  }


 private setJF(event) {
   this.events = event.map((e) => {

    return {
            start: this.getDate(e,this.getYear()),
            title: e.name,
            color: colors.blue,
            allDay: true,
            // meta: {
              // type: 'holiday',
              // e,
            // },
          };
        });
        this.cdr.markForCheck();
  }

 excludeDays: number[] = [0, 6];

getEvents() {
    const url = `${environment.apiUrl}getEvents`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
         this.setJF(data.data.jf);
        },
        (error) => {}
      );
  }

 getYear() {
    const d = new Date();
    return d.getFullYear();
 }

getDate(e,year){
  let ds = year+"-"+e.month+"-"+e.day+"T00:00:00";
  console.log(ds);
  return  new Date(ds);
}

}
