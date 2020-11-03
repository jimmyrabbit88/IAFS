import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.scss']
})
export class UpdateGameComponent implements OnInit {
  public games;
  public selected;
  public gameId;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.getGames()
  }

  public getGames(){
    this.dataService.getGames().subscribe(res => (this.games = res));
  }

  public updateAGame(game){
    this.gameId = game.gameId;
    this.selected = true;
  }
}
