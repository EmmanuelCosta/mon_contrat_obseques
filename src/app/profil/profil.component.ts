import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from "../core/route-animation/route.animation";
import * as Ps from 'perfect-scrollbar';
import { AppService } from "../services/app.service"
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as models from '../models/models';

@Component({
  selector: 'ms-blank',
  templateUrl: './profil-component.html',
  styleUrls: ['./profil-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class ProfilComponent implements OnInit {
  profilForm: FormGroup;
  oldPassword: string;
  newPassword: string;

  constructor(private formBuilder: FormBuilder, private pageTitleService: PageTitleService,
    private appService: AppService) {

  }

  ngOnInit() {
    this.profilForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]      
    });

    this.pageTitleService.setTitle("Mon profil");
    
  }

  resetPassword(): void {

    let value = this.profilForm.value;
    let email = localStorage.getItem("email");
  

    let credentials: models.LoginCredentials = {
            "email":email,
            "password":value.oldPassword,
            "newPassword":value.newPassword
    }
    this.appService.changePassword(credentials)
    .subscribe(

           (data : string)=> {
           alert("Votre mot de passe bien été modifié")
           },
           error => {
            alert("Le mot de passe n'a pas pû être modifié. L'ancien mot de passe n'est peut être pas correct")
              console.log("old password error "+error);}
         );

}


 
}














