import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToasterComponent, LoaderComponent],
  template: `<router-outlet /> <app-toaster /> <app-loader>`
})
export default class App {}