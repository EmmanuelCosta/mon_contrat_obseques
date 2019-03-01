import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import * as Ps from 'perfect-scrollbar';
import { AppService } from 'app/services';
import { first } from 'rxjs/operators';
import { FuneralHome } from 'app/models/models';
import Common from 'app/utils/Common';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

function getNewTime(d) {
  let h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
    m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
    s = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds(),
    time = h + ":" + m + ":" + s;
  return time;
}

@Component({
  selector: 'ms-dashboard',
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {

  public funeralHome: FuneralHome;
  public name = "";
  modalReference: NgbModalRef;
  destinataireEmail=""
  constructor(private pageTitleService: PageTitleService,
    private appService: AppService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Mon Contrat Obsèques");
    this.funeralHome = {}

    this.appService.getFhome()
      .pipe(first())
      .subscribe(
        funeralHome => {
          //console.log("code contract "+funeralHome.code)
          this.funeralHome = funeralHome;
          //console.log("code contract "+funeralHome)
        },
        error => {
          console.log("error " + error)

        });
    this.getEnsure();
  }

  getEnsure() {
    this.appService.getEnsure()
      .pipe(first())
      .subscribe(
        ensure => {
          console.log("success")
          this.name = ensure.firstName + " " + ensure.lastName
          localStorage.setItem('name', this.name);
        },
        error => {
          console.log("error " + error)

        });
  }

  open(result) {
    //console.log(' --> '+result);
    var closeResult: string;
   this.modalReference= this.modalService.open(result, { size: 'lg', backdrop: false });
    this.modalReference.result.then((result) => {
      //closeResult = `${result}`;

    }, (reason) => {
      closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      this.closeDownloadable();
      return `with: ${reason}`;
    }
  }

  closeDownloadable() {
    //console.log("-- im closed");  
    this.modalReference.close()
  }

  send(){
    this.appService.sendTo(this.destinataireEmail)
    .pipe(first())
    .subscribe(
      result => {
        //console.log("code contract "+funeralHome.code)
        
        this.closeDownloadable()
        //console.log("code contract "+funeralHome)
      },
      error => {
        this.closeDownloadable()
        console.log("error " + error)

      });
  }
}
