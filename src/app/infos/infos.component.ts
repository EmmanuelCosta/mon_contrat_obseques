import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from "../core/route-animation/route.animation";
import * as Ps from 'perfect-scrollbar';
import { AppService } from "../services/app.service"
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'app/models/models';

@Component({
  selector: 'ms-blank',
  templateUrl: './infos-component.html',
  styleUrls: ['./infos-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class InfosComponent implements OnInit {
  infosForm: FormGroup;
  contract: Contract;
  revalo: number;

  constructor(private formBuilder: FormBuilder, private pageTitleService: PageTitleService,
    private appService: AppService) {

  }

  ngOnInit() {
    this.infosForm = this.formBuilder.group({
      contractCode: ['', Validators.required],
      commercialName: ['', Validators.required],
      registrationDate: ['', Validators.required],
      assistance: ['', Validators.required],
      splittingName: ['', Validators.required],
      paymentDuration: ['', Validators.required],
      initialCapital: ['', Validators.required],
      deposit: ['', Validators.required],
      isEndorsement: ['', Validators.required],
      dueDate: ['', Validators.required],
      tarif: ['', Validators.required],
      revalo: ['', Validators.required],
    });

    this.pageTitleService.setTitle("Mes informations contrats");
    this.contract = {}
    this.appService.getContract()
      .pipe(first())
      .subscribe(
        contract => {
          this.contract = contract;
     

         // console.log("code contract " + this.contract.commercialTechnicalName)

          //console.log("code contract " + this.contract)
        },
        error => {
          console.log("error " + error)

        });

        this.appService.getRevalo()
        .pipe(first())
        .subscribe(
          revalo => {
            this.revalo = revalo;
       
  
           // console.log("code contract " + this.contract.commercialTechnicalName)
  
            //console.log("code contract " + this.contract)
          },
          error => {
            console.log("error " + error)
  
          });
  }

  translateBoolean(v) {
    if (v==true) {
      console.log("translate ok")
      return "OUI"
    }
    return "NON"
  }

  isPrimeUnique(){
    return this.contract.premiumType==="PRIME UNIQUE"
  }

  isPrimeViagere(){
    return this.contract.premiumType==="PRIME VIAGERE"
  }
}














