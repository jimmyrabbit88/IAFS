import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameId;
  test = "work you prick";
  gameOverview;
  gameIncidents;
  details: boolean = true;
  stats: boolean = false;
  lineups: boolean = false;
  social: boolean = false;
  standings: boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['id'];
    this.getGameOverview();
    this.getGameIncidents();
    
  }

  public getGameOverview(){
    this.dataService.getGame(this.gameId).subscribe(res => (this.gameOverview = res));
  }

  public getGameIncidents(){
    this.dataService.getGameIncidents(this.gameId).subscribe(res => (this.gameIncidents = res));
  }

  public resetComponentShown(){
    this.details = false;
    this.stats = false;
    this.lineups = false;
    this.social = false;
    this.standings = false;
  }

  public showDetails(){
    this.resetComponentShown();
    this.details = true;
  }

  public showStats(){
    this.resetComponentShown();
    this.stats = true;
  }

  public showLineups(){
    this.resetComponentShown();
    this.lineups = true;
  }

  public showSocial(){
    this.resetComponentShown();
    this.social = true;
  }

  public showStandings(){
    this.resetComponentShown();
    this.standings = true;
  }
}
