import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() gameDetails;
  @Input() game;
  details
  homeLogo;
  awayLogo;
  constructor() { }

  ngOnInit(): void {
    this.details = this.gameDetails.payload.doc.data();
    this.homeLogo = this.game[0].payload.doc.data().home.logo;
    this.awayLogo = this.game[0].payload.doc.data().away.logo;
  }

}
