import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

import { LegalMentionComponent } from './legalMention.component';
import {  LegalMentionRoutes } from './legalMention.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(LegalMentionRoutes)
  ],
  declarations: [ 
    LegalMentionComponent
  ]
})

export class LegalMentionModule {}
