import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MainComponent }   from './main/main.component';
//import { AuthComponent }   from './auth/auth.component';
//import { HorizontalLayoutComponent } from './horizontal-layout/horizontal-layout.component';
import {AuthGuard} from './_guards/auth-guard';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
},{
  path: '',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },{
    path: '',
    loadChildren: './infos/infos.module#InfosModule',
    canActivate: [AuthGuard]
  }
  ,{
    path: '',
    loadChildren: './document/document.module#DocumentModule',
    canActivate: [AuthGuard]
  }
  ,{
    path: '',
    loadChildren: './profil/profil.module#ProfilModule',
    canActivate: [AuthGuard]
  }
  ,{
    path: '',
    loadChildren: './legalMention/legalMention.module#LegalMentionModule',
    canActivate: [AuthGuard]
  }
  ],
},

{
  path: '',
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionDemoModule'
  }]
}];

