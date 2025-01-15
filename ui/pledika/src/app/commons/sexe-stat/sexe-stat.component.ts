import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: "app-sexe-stat",
  templateUrl: "./sexe-stat.component.html",
  styleUrls: ["./sexe-stat.component.css"],
})
export class SexeStatComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Fille" },
    { data: [], label: "Garçon" },
  ];

  setup(data) {
    const barChartLabels = [];
    let fille = [];
    let boy = [];
    data.forEach((e) => {
      barChartLabels.push(this.setTitre(e.promotion.split("-")[0]));
      fille.push(e.f);
      boy.push(e.m);
    });
    this.barChartLabels = barChartLabels;
    this.barChartData = [
      { data: fille, label: "Fille" },
      { data: boy, label: "Garçon" },
    ];
  }

setTitre(t){
 let m = t.split(" ");
 return m[0]+""+m[1]+" "+m[3]
}

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private elRef: ElementRef
  ) {}
  vpromos: any[];

  ID: any;
  users: any;
  promos = [];
  role;
  etab: any;
  e;

  terme = "action";
  getMarge(div, i) {
    return "50px";
  }
  ngOnInit() {
    this.getEtabInfo();
    this.getPromo();
  }

  getPromo() {
    this.app
      .getData(`${environment.apiUrl}getSexeStat`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promos = data.data;
          this.setup(this.promos);
        },
        (error) => {}
      );
  }

  getEtabInfo() {
    this.app
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }
}
