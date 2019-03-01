import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { fadeInAnimation } from "../core/route-animation/route.animation";


@Component({
  selector: 'ms-blank',
  templateUrl: './legalMention-component.html',
  styleUrls: ['./legalMention-component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class LegalMentionComponent implements OnInit {
  

  constructor(private pageTitleService: PageTitleService) {

  }

  ngOnInit() {
    this.pageTitleService.setTitle("Mentions Légales");  
  }
}














