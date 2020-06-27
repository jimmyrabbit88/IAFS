import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public games: Observable<any[]>
  selectedGame;
  private scores;

  constructor(public dataService: DataService, db: AngularFirestore) {
    this.games = db.collection('/items').valueChanges();
   }

  ngOnInit(): void {
  }

  public selectGame(game){
    this.selectedGame = game;
    this.scores = game.scores;
  }

  public getScores(){
    return this.scores;
  }
}
