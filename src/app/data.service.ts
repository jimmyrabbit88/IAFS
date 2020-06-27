import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  games = [
    {home:"Cork Admirals", away: "Dublin Rebels", location:"PBC Cork", date:'10-9-20', ko:"1300", score: "7-21"},
    {home:"UL VIkings", away: "Belfast Knights", location:"UL Limerick", date:'10-9-20', ko:"1300", score: "10-14"},
    {home:"Belfast Trojans", away: "Dublin Rhinos", location:"Belfast", date:'10-9-20', ko:"1300", score: "21-10"},
    {home:"Home", away: "Away", location:"default", date:'17-9-20', ko:"1300", score: "00-00"},
    {home:"Home", away: "Away", location:"default", date:'17-9-20', ko:"1300", score: "00-00"},
    {home:"Home", away: "Away", location:"default", date:'17-9-20', ko:"1300", score: "00-00"},
    {home:"Home", away: "Away", location:"default", date:'17-9-20', ko:"1300", score: "00-00"},
    {home:"Home", away: "Away", location:"default", date:'17-9-20', ko:"1300", score: "00-00"},
    {home:"Home", away: "Away", location:"default", date:'17-9-20', ko:"1300", score: "00-00"},
  ]

  constructor() { }

  public getGamesWithScore(): Array<{home, away, location, date, ko, score}>{
    return this.games;
  }   
}
