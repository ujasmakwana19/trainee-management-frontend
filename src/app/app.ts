import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterComponent } from './shared/toaster.component';
import { LoaderComponent } from './shared/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToasterComponent, LoaderComponent],
  template: `<router-outlet /> <app-toaster /> <app-loader>`
})
export default class App {}