/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication} from '@angular/platform-browser';
import App from './app/app';
import routes from './app/app.route'
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {providers: [provideRouter(routes)]}).catch((err) =>
  console.error(err),
);
