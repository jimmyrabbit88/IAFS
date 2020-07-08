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
  private gameId;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.getGames()
  }

  public getGames(){
    this.dataService.getGames().subscribe(res => (this.games = res));
  }

  public updateAGame(game){
    this.gameId = game.payload.doc.data().gameId;
    this.selected = true;
  }
}
