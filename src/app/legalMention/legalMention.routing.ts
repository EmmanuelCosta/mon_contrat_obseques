import { Routes } from '@angular/router';

import { LegalMentionComponent } from './legalMention.component';

export const LegalMentionRoutes: Routes = [{
  path: '',
  redirectTo: 'legalMention',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'legalMention',
    component: LegalMentionComponent
  }]
}];
