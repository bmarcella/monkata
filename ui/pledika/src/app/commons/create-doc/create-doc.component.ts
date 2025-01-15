import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-doc',
  templateUrl: './create-doc.component.html',
  styleUrls: ['./create-doc.component.css']
})
export class CreateDocComponent implements OnInit {
  e=false;
  ID:any;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    setInterval(()=>{
      this.e = true;
    },2000);
  }

}
