import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

import { ProfilComponent } from './profil.component';
import {  ProfilRoutes } from './profil.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(ProfilRoutes)
  ],
  declarations: [ 
    ProfilComponent
  ]
})

export class ProfilModule {}
