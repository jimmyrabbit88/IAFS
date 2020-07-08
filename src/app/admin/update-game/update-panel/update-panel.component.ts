import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

import { ScoreType } from 'src/app/shared/score-type.enum'
import { firestore } from 'firebase';

@Component({
  selector: 'app-update-panel',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./update-panel.component.scss']
})


export class UpdatePanelComponent implements OnInit {
  @Input() gameId;

  ScoreType = ScoreType;

  game;
  games;
  gameInc;
  isHomeTeam: boolean;
  score: number;
  momentElement;
  quarter: string;
  newScore: string;
  

  constructor( public ds: DataService) { }

  ngOnInit(): void {
    //console.log(this.gameId)
    this.ds.getGame(this.gameId).subscribe(gameResult => {
      this.game = gameResult[0];
      this.games = gameResult;
    })
    this.ds.getGameIncidents(this.gameId).subscribe(gameIncResults => {
      this.gameInc = gameIncResults[0];
    })
  }

  public onDetailsUpdated(eventData){
    this.addScore(this.isHomeTeam, this.score, this.game);
    
    this.momentElement = {
      "homeTeam": this.isHomeTeam,
      "type": this.score,
      "player" : eventData.player ? eventData.player : null,
      "playerNum" : eventData.playerNum ? eventData.playerNum : null,
      "distance" : eventData.distance ? eventData.distance : null,
      "scoreDetail": eventData.tdType ? eventData.tdType : null,
      "passer" : eventData.passer ? eventData.passer: null,
      "score" : this.newScore,
      "time" : firestore.Timestamp.now()
    }

    this.ds.updateMoment(this.gameInc, this.momentElement);
  }

  public addScore(isHomeTeam: boolean, score: number, gameId: string){
    this.ds.updateScore(isHomeTeam, score, this.game);
    this.getNewScoreString(isHomeTeam, score)

  }

  public getNewScoreString(isHomeTeam: boolean, score: number){
    let away = this.game.payload.doc.data().away.score;
    let home = this.game.payload.doc.data().home.score;
    if(isHomeTeam){
      home = home + score;
    }
    else{
      away = away + score;
    }
    this.newScore = (away + " : " + home);
  }
}
