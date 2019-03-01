import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

import { DocumentComponent } from './document.component';
import { DocumentRoutes } from './document.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    RouterModule.forChild(DocumentRoutes)
  ],
  declarations: [ 
    DocumentComponent
  ]
})

export class DocumentModule {}
