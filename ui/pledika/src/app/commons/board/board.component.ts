import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  ID: any;


  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, public studServ: StudentsService, public app: AppService) { }

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
  }

}
