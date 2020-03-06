import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from "../core/route-animation/route.animation";
import * as Ps from 'perfect-scrollbar';
import { AppService } from 'app/services';
import { first } from 'rxjs/operators';
import { Contract } from 'app/models/models';


@Component({
  selector: 'ms-document',
  templateUrl: './document-component.html',
  styleUrls: ['./document-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class DocumentComponent implements OnInit {

  code: string;
  contract: Contract;
  displayLIA:boolean;

  constructor(private pageTitleService: PageTitleService,
    private appService: AppService) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Veuillez cliquer sur le document à télécharger");
    this.appService.getContract()
      .pipe(first())
      .subscribe(
        contract => {
          this.code = contract.code;
        },
        error => {
          console.log("error " + error)

        });
        this.displayLIA=false;
      //  this.getContract();
        this.havingLIA();
  }

  getContract(){
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
  }


  havingLIA(){
    this.appService.havingLIA()
      .pipe(first())
      .subscribe(
        displayLIA => {
          this.displayLIA = displayLIA;
     

         // console.log("code contract " + this.contract.commercialTechnicalName)

          //console.log("code contract " + this.contract)
        },
        error => {
          console.log("error " + error)

        });
  }
  downloadFile(templateType: number) {
    let code = this.code
    this.appService.downloadFile(templateType, code)
      .pipe(first())
      .subscribe(data => {
        console.log(" -- -- " + data.blob)
        this.appService.saveFile(data.blob, data.name);
      },
        error => {
          console.log('==> ' + error);
        });
  }


  downloadFile2(templateType: number) {
    let code = this.code
    this.appService.downloadResource(templateType, code)
      //  .pipe(first())
      .subscribe(data => {
        console.log(" -- -- " + data.blob())
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