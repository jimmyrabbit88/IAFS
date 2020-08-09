import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy{
  public games;
  public game;
  public selectedGame: boolean = false;
  private scores;
  private allGamesSub: Subscription;
  private singleGameSub: Subscription;
  public dateFrom = new Date();
  public dateTo = new Date(); 

  constructor(public dataService: DataService, public router: Router) {}


  ngOnInit(): void {
    this.setDates();
    this.getGames();
    console.log(this.dateTo);
  }

  public setDates(){
    var now = new Date();
    now.setHours(0,0,0);
    this.dateFrom.setDate(now.getDate() - (now.getDay() || 7) + 7);
    this.dateFrom.setHours(0,0,0);
    this.dateTo.setDate(this.dateFrom.getDate() + 7)
    this.dateTo.setHours(0,0,0);

  }

  public getGames(){
    this.allGamesSub = this.dataService.getGamesWeek(this.dateFrom, this.dateTo).subscribe(res => (this.games = res));
    console.log(this.dateTo);
  }
  
  public selectAGame(game) {
    this.router.navigate(['/','game', game.payload.doc.data().gameId]);
  }

  public nextWeek(){
    this.dateFrom = new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth(), this.dateFrom.getDate()+7);
    this.dateTo = new Date(this.dateTo.getFullYear(), this.dateTo.getMonth(), this.dateTo.getDate()+7);
    this.getGames()
  }

  public lastWeek(){
    this.dateFrom = new Date(this.dateFrom.getFullYear(), this.dateFrom.getMonth(), this.dateFrom.getDate()-7);
    this.dateTo = new Date(this.dateTo.getFullYear(), this.dateTo.getMonth(), this.dateTo.getDate()-7);
    this.getGames();
  }

  ngOnDestroy(): void {
    this.allGamesSub.unsubscribe();
  }
}

