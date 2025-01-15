import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomModule } from '../../../../common/DynamicObject/dist/dom';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DomModule],
  templateUrl: './app.template.html'
})
export class App { }