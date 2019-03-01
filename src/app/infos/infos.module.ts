import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

import { InfosComponent } from './infos.component';
import {  InfosRoutes } from './infos.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(InfosRoutes)
  ],
  declarations: [ 
    InfosComponent
  ]
})

export class InfosModule {}
