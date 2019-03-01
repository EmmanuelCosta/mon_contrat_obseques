import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as models from '../../models/models';
import Common from '../../utils/Common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/services';

@Component({
  selector: 'ms-loginone-session',
  templateUrl: './loginone-component.html',
  styleUrls: ['./loginone-component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginoneComponent {

  login: string;
  password: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  credentials: models.LoginCredentials
  public edited = false;
  public accepted = false;
  token: string
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService, private modalService: NgbModal, private appService: AppService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.credentials = {};

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginone(popupCGU) {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert("error")
      return;
    }
    this.credentials.email = this.f.login.value;
    this.credentials.password = this.f.password.value;
    let hasAlreadyAcceptedCGU = false;
    this.authenticationService.login(this.credentials)
      .pipe(first())
      .subscribe(
        token => {

          hasAlreadyAcceptedCGU = token.cgu;
          this.token = token.encodeToken;
          console.log(" hasAlreadyAcceptedCGU = " + hasAlreadyAcceptedCGU)
          if (hasAlreadyAcceptedCGU) {
           
          
              this.beginApp(token);
          } else {
           
              this.open(popupCGU, token);
          }

        },
        error => {
          console.log("error " + error)
          this.error = error;
          this.loading = false;
          this.wrongCredetential();
        });
  }

  

  wrongCredetential() {
    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;

    }.bind(this), 5000);
  }
  beginApp(data): void {
    var c = new Common();
    localStorage.setItem(c.getTokenName(), data.encodeToken);
    localStorage.setItem('userName', data.userName);
    localStorage.setItem('code', data.code);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.roles[0]);


    if (c.isEnsure()) {
    
      this.router.navigate([this.returnUrl]);
    } else {
      // this.router.navigate([this.returnUrl]);
      this.wrongCredetential();
      console.log("error begin app")
    }
  }

  open(result, data) {
    var closeResult: string;
    this.modalService.open(result, { size: 'lg', backdrop: false }).result.then((result) => {


    }, (reason) => {
      
        closeResult = `Dismissed ${this.getDismissReason(reason, data)}`;
    });
}

private getDismissReason(reason: any, data): string {

    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
      var c = new Common();
      localStorage.setItem(c.getTokenName(), this.token);
        this.authenticationService.acceptCGU(this.credentials)
        .subscribe(

            result => {
                this.beginApp(data);
            },
            error => {
              console.log("error " + error)
              this.error = error;
              this.loading = false;
              this.wrongCredetential();
            }
        );


        return `with: ${reason}`;
    }
}

  

  download() {
    this.appService.downloadCGU()
      //  .pipe(first())
      .subscribe(data => {
  
        let filename = '';
        var headers = data.headers
        var disposition = headers.get('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        let file = new Blob([data.blob()], { type: 'application/pdf' })
        this.appService.saveFile(file, filename);
      },
        error => {
          console.log('==> ' + error);
        });
  }
}



