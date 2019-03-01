import {Component, Optional, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  	selector: 'chankya-app',
  	template:'<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None
})
export class ChankyaAppComponent {
   constructor(translate: TranslateService) {
       translate.addLangs(['en', 'fr']);
       translate.setDefaultLang('en');

       const browserLang: string = translate.getBrowserLang();
       translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
     }
}
