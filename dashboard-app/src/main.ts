import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ContentComponent } from './app/pages/content/content.component';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';  // Import HttpClientModule
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(ContentComponent, {
  providers: [
    provideHttpClient(),  // Add HttpClient provider here
    provideRouter(routes),
  ]
})
  .catch((err) => console.error(err));
