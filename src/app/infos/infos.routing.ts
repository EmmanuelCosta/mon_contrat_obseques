import { Routes } from '@angular/router';

import { InfosComponent } from './infos.component';

export const InfosRoutes: Routes = [{
  path: '',
  redirectTo: 'infos',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'infos',
    component: InfosComponent
  }]
}];
