import { Routes } from '@angular/router';

import { DocumentComponent } from './document.component';

export const DocumentRoutes: Routes = [{
  path: '',
  redirectTo: 'document',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'document',
    component: DocumentComponent
  }]
}];
