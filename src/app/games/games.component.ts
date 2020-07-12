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

  constructor(public dataService: DataService, public router: Router) {}


  ngOnInit(): void {
    this.getGames();
  }

  public getGames(){
    this.allGamesSub = this.dataService.getGames().subscribe(res => (this.games = res));
  }
  
  public selectAGame(game) {
    this.router.navigate(['/','game', game.payload.doc.data().gameId]);
  }

  ngOnDestroy(): void {
    this.allGamesSub.unsubscribe();
  }
}

