import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  nextId: string
  homeTeam: string;
  awayTeam: string;
  location: string ='';
  ko: Date;
  localCompleteDate: string;
  teams: Array<{name: string, logo: string}> = [
    {name: "Cork Admirals", logo: "admirals.png"},
    {name: "Belfast Trojans", logo: "trojans.png"},
    {name: "CarrickFergus Knights", logo: "knights.png"},
    {name: "UCD", logo: "ucd.png"},
    {name: "Dublin Panthers", logo: "panthers.png"},
    {name: "UL Vikings", logo: "vikings.png"},
    {name: "Dublin Rebels", logo: "rebels.png"},
    {name: "Dublin Rhinos", logo: "rhinos.png"},
  ];
  private game;
  private gameIncidents;

  constructor(public data: DataService, public router: Router) {
    this.ko = new Date;
    this.localCompleteDate = this.ko.toISOString();
    this.localCompleteDate = this.localCompleteDate.substring(0, this.localCompleteDate.length - 1);
  }

  ngOnInit(): void {
    this.generateGameId();
  }

  public addGame(){
    const home = this.teams.find(team => team.name.includes(this.homeTeam));
    const away = this.teams.find(team => team.name.includes(this.awayTeam));
    const time = firestore.Timestamp.fromDate(new Date(this.localCompleteDate));
    this.game = {
      gameId: this.nextId,
      away: {name: away.name, score: 0, logo: away.logo},
      home: {name: home.name, score: 0, logo: home.logo},
      location: this.location,
      ko: time
    };
    this.gameIncidents = {
      gameId: this.nextId,
      moments: [{}]
    }
    this.data.addGame(this.game);
    this.data.addGameIncidents(this.gameIncidents);
    this.router.navigate(['/']);
  }

  private generateGameId(){
    this.data.nextId().subscribe(res => {
      const gameid:any = res.reduce((prev: any, current: any) => (prev.gameId > current.gameId) ? prev : current)
      this.nextId = ((+gameid.gameId + 1).toString());
    });
  }

}
