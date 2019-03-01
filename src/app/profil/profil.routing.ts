import { Routes } from '@angular/router';

import { ProfilComponent } from './profil.component';

export const ProfilRoutes: Routes = [{
  path: '',
  redirectTo: 'profil',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'profil',
    component: ProfilComponent
  }]
}];
