import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../_Services/loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
})
export class LoaderComponent implements OnInit {
  private subscription: Subscription;
  show:boolean;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
