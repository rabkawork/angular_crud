import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ContentComponent } from './app/pages/content/content.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
