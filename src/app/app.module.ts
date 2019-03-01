import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';


import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SidebarModule } from 'ng-sidebar';
import {Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';
import 'hammerjs';

import { ChankyaAppComponent} from './app.component';
import { AppRoutes } from "./app-routing.module";
import { MainComponent }   from './main/main.component';
//import { AuthComponent }   from './auth/auth.component';
//import { HorizontalLayoutComponent } from './horizontal-layout/horizontal-layout.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HttpModule } from '@angular/http';

/********** Custom option for ngx-translate ******/
export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} 

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		CdkTableModule,
	    MatAutocompleteModule,
	    MatButtonModule,
	    MatButtonToggleModule,
	    MatCardModule,
	    MatCheckboxModule,
	    MatChipsModule,
	    MatDatepickerModule,
	    MatDialogModule,
	    MatExpansionModule,
	    MatFormFieldModule,
	    MatGridListModule,
	    MatIconModule,
	    MatInputModule,
	    MatListModule,
	    MatMenuModule,
	    MatProgressBarModule,
	    MatProgressSpinnerModule,
	    MatRadioModule,
	    MatSelectModule,
	    MatSlideToggleModule,
	    MatSliderModule,
	    MatSidenavModule,
	    MatSnackBarModule,
	    MatStepperModule,
	    MatTabsModule,
	    MatToolbarModule,
	    MatTooltipModule,
	    MatPaginatorModule,
	    MatSortModule,
		MatTableModule,
		SidebarModule.forRoot(),
		RouterModule.forRoot(AppRoutes),
		TourNgBootstrapModule.forRoot(),
		FlexLayoutModule,
		NgbModalModule.forRoot(),
		Ng5BreadcrumbModule.forRoot(),
		AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
        PerfectScrollbarModule,
        MenuToggleModule,
		HttpClientModule,
		HttpModule,
			TranslateModule.forRoot({
			   loader: {
			      provide: TranslateLoader,
			      useFactory: createTranslateLoader,
			      deps: [HttpClient]
			   }
			}),
	],
	declarations: [
		ChankyaAppComponent, 
		MainComponent,
	//	AuthComponent,
	//	HorizontalLayoutComponent
	],
	entryComponents: [
	],
	bootstrap: [ChankyaAppComponent],
	providers:[
		MenuItems,
		BreadcrumbService,
		PageTitleService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		
	]
})
export class ChankyaAppModule { }
