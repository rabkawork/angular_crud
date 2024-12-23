import { Routes } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';

export const routes: Routes = [
  { path: '', redirectTo: 'content', pathMatch: 'full' }, // Default route
  { path: 'content', component: ContentComponent },
];
