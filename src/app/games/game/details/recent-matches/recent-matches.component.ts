import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-recent-matches',
  templateUrl: './recent-matches.component.html',
  styleUrls: ['./recent-matches.component.scss']
})
export class RecentMatchesComponent implements OnInit {
  public away
  @Input() game: any;

  constructor(public ds: DataService) { }

  ngOnInit(): void {
    if(this.game){
      console.log("ok");
      this.ds.getRecentMatches(this.game).subscribe((res) => {
        this.away = res
      })
    }
     
  }

}
