import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

import { ScoreType } from 'src/app/shared/score-type.enum'
import { firestore } from 'firebase';
import { ScoreDetails } from 'src/app/shared/score-details.model';
import { stringify } from 'querystring';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-panel',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./update-panel.component.scss']
})


export class UpdatePanelComponent implements OnInit {
  @Input() gameId;

  ScoreType = ScoreType;
  private xpMade: boolean;
  private tptMade: boolean;

  game;
  games;
  gameInc;
  isHomeTeam: boolean;
  score: number;
  momentElement;
  quarter: number;
  newScore: string;
  

  constructor( public ds: DataService) { }

  ngOnInit(): void {
    this.ds.getGame(this.gameId).subscribe(gameResult => {
      this.game = gameResult[0];
      this.games = gameResult;
    })
    this.ds.getGameIncidents(this.gameId).subscribe(gameIncResults => {
      this.gameInc = gameIncResults[0];
    })
  }

  public onTdAdded(eventData){
    this.setPointAfterValues(eventData.ptAfter);
    
    this.addScore(this.isHomeTeam, this.score, this.game);

    const momentElem = new ScoreDetails(
      this.isHomeTeam, 
      this.score, 
      this.newScore,
      firestore.Timestamp.now(),
      eventData.player, 
      eventData.playerNum,
      eventData.distance,
      eventData.tdType,
      eventData.passer,
      eventData.isMadeFg,
      this.xpMade,
      this.tptMade,
      eventData.ptaPlayer,
      eventData.ptaPlayerNum
      );

    this.ds.updateMoment(this.gameInc, Object.assign({}, momentElem));
    this.resetFields();
    
  }

  public onFgAdded(eventData){
    let typeOfScore: string;
    
    if(eventData.isMadeFg){
      this.addScore(this.isHomeTeam, this.score, this.game);
      typeOfScore = "FG Made"
    }
    else{
      this.addScore(this.isHomeTeam, 0, this.game);
      typeOfScore = "FG Missed"
    }

    const momentElem = new ScoreDetails(
      this.isHomeTeam, 
      this.score, 
      this.newScore,
      firestore.Timestamp.now(),
      eventData.player, 
      eventData.playerNum,
      eventData.distance,
      typeOfScore,
      eventData.passer,
      eventData.isMadeFg,
      this.xpMade,
      this.tptMade,
      eventData.ptaPlayer,
      eventData.ptaPlayerNum
      );

      this.ds.updateMoment(this.gameInc, Object.assign({}, momentElem));
      this.resetFields();
  }

  public onSAdded(eventData){
    let typeOfScore: string = "Safety";
    
    this.addScore(this.isHomeTeam, this.score, this.game);
  
    const momentElem = new ScoreDetails(
      this.isHomeTeam, 
      this.score, 
      this.newScore,
      firestore.Timestamp.now(),
      eventData.player, 
      eventData.playerNum,
      eventData.distance,
      typeOfScore,
      null,
      eventData.isMadeFg,
      this.xpMade,
      this.tptMade,
      eventData.ptaPlayer,
      eventData.ptaPlayerNum
      );

      this.ds.updateMoment(this.gameInc, Object.assign({}, momentElem));
      this.resetFields();
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

  public setPointAfterValues(pa):void {
    switch(pa) { 
      case 0: { 
         this.xpMade = false; 
         break; 
      } 
      case 1: { 
        this.xpMade = true;
        this.score = 7;
        break; 
      }
      case 2: { 
        this.tptMade = true;
        this.score = 8; 
        break; 
      }
      case 3: { 
        this.xpMade = false; 
        break; 
      } 
      default: {  
         break; 
      } 
   } 
  }

  public whatQ(){
    (this.gameInc) ? this.quarter = this.gameInc.payload.doc.data().quarter : this.quarter = undefined;
    return this.quarter;
  }

  public startGame(){
    this.endQuarter();
  }

  public endGame(){
    this.endQuarter();
    this.ds.endGame(this.gameInc);
  }

  public endQuarter(){
    const test = [
      "First Quarter",
      "Second Quarter ",
      "Third Quarter",
      "Fourth Quarter"
    ]
    const homeScore = this.getScore(0);
    const awayScore = this.getScore(1);
    const data = {
      type : "Break",
      name : test[this.quarter],
      end : this.quarter,
      homeScore : homeScore,
      awayScore : awayScore,
      time: firestore.Timestamp.now(),
    }
    this.ds.updateMoment(this.gameInc, Object.assign({}, data));
    this.ds.nextQuarter(this.gameInc);
  }

  /**
   * return the score of selected team pass in 1 for Away, 0 for Home team;
   * 
   * @param side 
   */
  public getScore(side: number){
    if(side == 1){
      return this.game.payload.doc.data().away.score;
    }
    else if(side == 0){
      return this.game.payload.doc.data().home.score;
    }
    else{
      return '';
    }
  }

  public resetFields(){
    this.isHomeTeam = undefined;
    this.xpMade = undefined;
    this.tptMade = undefined;
  }
}
