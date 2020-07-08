import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public games;
  public game;
  public selectedGame: boolean = false;
  private scores;

  constructor(public dataService: DataService, public router: Router) {}

  today: number = Date.now();

  ngOnInit(): void {
    this.getGames();
  }

  //Return a list of all games
  public getGames(){
    this.dataService.getGames().subscribe(res => (this.games = res));
  }
  

  public selectAGame(game) {
    this.router.navigate(['/','game', game.payload.doc.data().gameId])
    this.selectedGame = true;
    this.dataService.getGame(game.payload.doc.data().gameId).subscribe(res => (this.game = res));
  }
}
