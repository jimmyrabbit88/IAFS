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
  quarterDetails;
  constructor() { }

  ngOnInit(): void {
    this.details = this.gameDetails.payload.doc.data();
    this.homeLogo = this.game[0].payload.doc.data().home.logo;
    this.awayLogo = this.game[0].payload.doc.data().away.logo;
    this.quarterDetails = this.details.moments.filter(detail => detail.type == "Break");
  }

  getScore(ref: number){
    var score = 0;
    (ref==1) ? score = this.game[0].payload.doc.data().away.score : score = this.game[0].payload.doc.data().home.score
    return score;
  }
  
  getLogo(ref: number){
    var logo = 0;
    (ref==1) ? logo = this.game[0].payload.doc.data().away.logo : logo = this.game[0].payload.doc.data().home.logo
    return logo;
  }
  
  getName(ref: number){
    var name = 0;
    (ref==1) ? name = this.game[0].payload.doc.data().away.name : name = this.game[0].payload.doc.data().home.name
    return name;
  }

  getEndQuarterScore(q: number, ref: number) :number{
    var score = 0;
    if(this.quarterDetails[q]){
      (ref==1) ? score = (this.quarterDetails[q].awayScore - this.quarterDetails[q-1].awayScore) : score = (this.quarterDetails[q].homeScore - this.quarterDetails[q-1].homeScore);
    }
    return score;
  }

}
