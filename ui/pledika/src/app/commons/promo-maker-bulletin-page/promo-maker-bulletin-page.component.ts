import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-promo-maker-bulletin-page',
  templateUrl: './promo-maker-bulletin-page.component.html',
  styleUrls: ['./promo-maker-bulletin-page.component.css']
})
export class PromoMakerBulletinPageComponent implements OnInit {

  constructor(    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   const link = this.route.snapshot.params.link;
   const key  = this.route.snapshot.params.key;
        this.router.navigate([...link.split("."),key]);
  }

}
