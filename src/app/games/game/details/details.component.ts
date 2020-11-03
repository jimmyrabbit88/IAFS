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
    if(this.gameDetails.moments){
      this.quarterDetails = this.gameDetails.moments.filter(detail => detail.type == "Break");
    }
  }

  getScore(ref: number) :number{
    var score = 0;
    (ref==1) ? score = this.game.away.score : score = this.game.home.score;
    return score;
  }
  
  getLogo(ref: number) :number{
    var logo = 0;
    (ref==1) ? logo = this.game.away.logo : logo = this.game.home.logo
    return logo;
  }
  
  getName(ref: number) :string{
    var name = '';
    (ref==1) ? name = this.game.away.name : name = this.game.home.name
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
