import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfYear, subYears } from 'date-fns';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AppService } from '../_Services/app.service';
import { AuthenticationService } from '../_Services/Authentification.service';

interface Holiday {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

@Component({
  selector: 'app-etab-page',
  templateUrl: './etab-page.component.html',
  styleUrls: ['./etab-page.component.css']
})
export class EtabPageComponent implements OnInit {
   constructor() {
  }


  ngOnInit() {

  }


}
